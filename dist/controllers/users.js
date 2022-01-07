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
exports.loginUser = exports.rigisterUser = exports.isSignedIn = exports.cork = void 0;
const Users_1 = require("../models/Users");
const jwt_simple_1 = require("jwt-simple");
const md5 = require("md5");
const expressJwt = require("express-jwt");
require("dotenv").config();
const cork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(400).send("simpe pass");
    }
    catch (err) {
        res.status(400).json({
            error: "Registration error"
        });
    }
});
exports.cork = cork;
exports.isSignedIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
    algorithms: ["HS256"]
});
const rigisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        if (!(login && password)) {
            return res.status(400).send("All input required");
        }
        const oldUser = yield Users_1.usersModel.findOne({ login });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const encryptedPassword = md5(password);
        const newUser = yield Users_1.usersModel.create({ login: req.body.login, email: req.body.email, password: encryptedPassword });
        return res.status(200).json(newUser);
    }
    catch (err) {
        res.status(400).json({
            error: "Registration error"
        });
    }
});
exports.rigisterUser = rigisterUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        const user = yield Users_1.usersModel.findOne({ login });
        if (!user) {
            return res.json({ status: "error", error: "Invalid username" });
        }
        const passwordcompare = (yield md5(password)) == user.password;
        if (passwordcompare) {
            const token = (0, jwt_simple_1.encode)({
                id: user._id,
                login: user.login
            }, process.env.JWT_SECRET, "HS256");
            return res.json({ user, token: token });
        }
        else {
            return res.json({ status: "error", error: "Check the password again" });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=users.js.map