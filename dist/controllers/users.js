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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.rigisterUser = exports.isSignedIn = void 0;
const Users_1 = require("../models/Users");
const jwt_simple_1 = require("jwt-simple");
const md5_1 = __importDefault(require("md5"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
function isSignedIn(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
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
        const encryptedPassword = (0, md5_1.default)(password);
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
        let userSearch;
        const { login, password } = req.body;
        const resultLogin = login.search("@");
        if (resultLogin != -1) {
            userSearch = yield Users_1.usersModel.findOne({ email: login });
        }
        else {
            userSearch = yield Users_1.usersModel.findOne({ login });
        }
        if (!userSearch) {
            return res.status(200).json({ status: "error", error: "Invalid login" });
        }
        const passwordcompare = (yield (0, md5_1.default)(password)) == userSearch.password;
        if (passwordcompare) {
            const token = (0, jwt_simple_1.encode)({
                id: userSearch._id,
                login: userSearch.login
            }, process.env.JWT_SECRET, "HS256");
            return res.status(200).json({ userSearch, token: token });
        }
        else {
            return res.status(200).json({ status: "error", error: "Check the password again" });
        }
    }
    catch (err) {
        res.status(400).json({
            error: "login error"
        });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=users.js.map