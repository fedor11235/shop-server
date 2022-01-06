
import { Request, Response, NextFunction} from "express";
// import { body, check, validationResult } from "express-validator";
import { userModel } from "../models/Users";
// const bodyParser = require('body-parser')
// import { Schema, model } from "mongoose";
// import passport from "passport";

// create application/json parser
// const jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded({ extended: false };

declare module "express" { 
    export interface Request {
      user: any
    }
  }


export const getLogin = (req: Request, res: Response): void => {
    // // res.send('login');
    // if (req.user) {
    //     return res.redirect("/");
    // }
    res.render("account/login");
};

export const rigisterUser = (req: Request, res: Response): void => {
    console.log(req.body)
    const newUser = new userModel({ name: req.body.name, email: req.body.email, password:req.body.password });
    newUser.save();
    res.send('You have successfully registered !!');
};

