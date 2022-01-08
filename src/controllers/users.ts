import { usersModel } from "../models/Users";
import { encode } from "jwt-simple";
import md5 from "md5";
import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
require("dotenv").config();

export function isSignedIn(req:Request, res:Response, next:NextFunction): any {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next()
    })
}

export const rigisterUser = async (req:Request, res:Response): Promise<void> => {
    try {
        const { login, password, email } = req.body;
        if (!(login && password && email)) {
            return res.status(400).send("All input required");
        }
        const oldUserEmail = await usersModel.findOne({ email });
        if (oldUserEmail) {
            return res.status(409).send("User Already Exist. Please Email");
        }
        const oldUserLogin = await usersModel.findOne({ login });
        if (oldUserLogin) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const encryptedPassword = md5(password);
        const newUser = await usersModel.create({ login: req.body.login, email: req.body.email, password: encryptedPassword });
        return res.status(200).json(newUser)
    } catch (err) {
        res.status(400).json({
            error: "Registration error"
        })
    }
};

export const loginUser = async (req:Request, res:Response): Promise<void> => {
    try {
        let userSearch;
        const { login, password } = req.body
        const resultLogin = login.search("@")

        if (resultLogin != -1) {
            userSearch = await usersModel.findOne({ email: login })
        } else {
            userSearch = await usersModel.findOne({ login })
        }

        if (!userSearch) {
            return res.status(200).json({ status: "error", error: "Invalid login" })
        }
        const passwordcompare = await md5(password) == userSearch.password;

        if (passwordcompare) {
            const token = encode(
                {
                    id: userSearch._id,
                    login: userSearch.login
                },
                process.env.JWT_SECRET,
                "HS256"
            )
            return res.status(200).json({ userSearch, token: token })
        } else {
            return res.status(200).json({ status: "error", error: "Check the password again" })
        }
    } catch (err) {
        res.status(400).json({
            error: "login error"
        })
    }
};