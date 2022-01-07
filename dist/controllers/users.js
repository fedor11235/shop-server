"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rigisterUser = exports.getLogin = void 0;
const Users_1 = require("../models/Users");
const md5 = require("md5");
// import bcrypto from "bcrypto"
// const bodyParser = require('body-parser')
// import { Schema, model } from "mongoose";
// import passport from "passport";
// create application/json parser
// const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded({ extended: false };
const getLogin = (req, res) => {
    res.send("You're being authorised!!!");
};
exports.getLogin = getLogin;
const rigisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        if (!(login && password)) {
            res.status(400).send("All input required");
        }
        const oldUser = yield Users_1.usersModel.findOne({ login });
        if (oldUser) {
            res.status(409).send("User Already Exist. Please Login");
        }
        const encryptedPassword = yield md5(password);
        const newUser = new Users_1.usersModel({ login: req.body.login, email: req.body.email, password: encryptedPassword });
        newUser.save();
        res.status(400).send("You are authorized");
    }
    catch (err) {
        res.status(400).json({
            error: "Please enter yor email and password"
        });
    }
});
exports.rigisterUser = rigisterUser;
//# sourceMappingURL=users.js.map