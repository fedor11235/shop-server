import { usersModel } from "../models/Users";
import { encode } from "jwt-simple";
import * as md5 from "md5";
import * as expressJwt from "express-jwt";
require("dotenv").config();

export const cork = async (req, res) => {
    try{
        res.status(400).send("simpe pass")
    } catch (err) {
        res.status(400).json({
            error:"Registration error"
        })
    }
};

export const isSignedIn = expressJwt ({
        secret: process.env.JWT_SECRET,
        userProperty:"auth",
        algorithms:["HS256"]
    });

export const  rigisterUser = async (req, res) => {
    try{
        const {login, password} = req.body;
        if (!(login && password)) {
            return res.status(400).send("All input required");
        }
        const oldUser = await usersModel.findOne({login});
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const encryptedPassword = md5(password);
        const newUser = await usersModel.create({ login: req.body.login, email: req.body.email, password:encryptedPassword });
        return res.status(200).json(newUser)
    } catch (err) {
        res.status(400).json({
            error:"Registration error"
        })
    }
};

export const loginUser = async (req, res) => {
    try {
        const {login, password} = req.body
        const user = await usersModel.findOne({login})
        if (!user){
            return res.json({status:"error", error: "Invalid username"})
        }
        const passwordcompare = await md5(password)==user.password;

        if(passwordcompare) {
            const token = encode(
                {
                    id: user._id,
                    login: user.login
                },
                process.env.JWT_SECRET,
                "HS256"
            )
            return res.json({user, token:token})
        } else {
            return res.json({status:"error", error:"Check the password again"})
        }
    } catch(err){
        console.log(err)
    }
};

