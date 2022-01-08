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
exports.loginUser = exports.rigisterUser = exports.isSignedIn = void 0;
const Users_1 = require("../models/Users");
const jwt_simple_1 = require("jwt-simple");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
require("dotenv").config();
function isSignedIn(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log(err);
        if (err)
            return res.sendStatus(403);
        req.user = user;
        console.log(user);
        next();
    });
}
exports.isSignedIn = isSignedIn;
const rigisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password, email } = req.body;
        if (!(login && password && email)) {
            return res.status(400).send("All input required");
        }
        const oldUserEmail = yield Users_1.usersModel.findOne({ email });
        if (oldUserEmail) {
            return res.status(409).send("User Already Exist. Please Email");
        }
        const oldUserLogin = yield Users_1.usersModel.findOne({ login });
        if (oldUserLogin) {
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
        let user;
        const { login, password } = req.body;
        console.log(typeof (login), login);
        const resultLogin = login.search("@");
        if (resultLogin != -1) {
            user = yield Users_1.usersModel.findOne({ email: login });
            console.log("EMAIL");
        }
        else {
            user = yield Users_1.usersModel.findOne({ login });
            console.log("LOGIN");
        }
        if (!user) {
            return res.json({ status: "error", error: "Invalid login" });
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