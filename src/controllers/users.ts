
import { Request, Response, NextFunction} from "express";
import { usersModel } from "../models/Users";
import * as md5 from "md5";
import jwt from "jsonwebtoken"
import expressjwt from "express-jwt"
// import bcrypto from "bcrypto"
// const bodyParser = require('body-parser')
// import { Schema, model } from "mongoose";
// import passport from "passport";

// create application/json parser
// const jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded({ extended: false };



export const getLogin = (req: Request, res: Response): void => {
    res.send("You're being authorised!!!");
};

export const rigisterUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const {login, password} = req.body;
        if (!(login && password)) {
            res.status(400).send("All input required");
        }
        const oldUser = await usersModel.findOne({login});
        if (oldUser) {
            res.status(409).send("User Already Exist. Please Login");
        }
        const encryptedPassword = await md5(password);
        const newUser = new usersModel({ login: req.body.login, email: req.body.email, password:encryptedPassword });
        newUser.save()
        res.status(400).send("You are authorized");
    } catch (err) {
        res.status(400).json({
            error:"Please enter yor email and password"
        })
    }
};

