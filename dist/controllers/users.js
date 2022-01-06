"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rigisterUser = exports.getLogin = void 0;
// import { body, check, validationResult } from "express-validator";
const Users_1 = require("../models/Users");
const getLogin = (req, res) => {
    // // res.send('login');
    // if (req.user) {
    //     return res.redirect("/");
    // }
    res.render("account/login");
};
exports.getLogin = getLogin;
const rigisterUser = (req, res) => {
    console.log(req.body);
    const newUser = new Users_1.userModel({ name: req.body.name, email: req.body.email, password: req.body.password });
    newUser.save();
    res.send('end save');
};
exports.rigisterUser = rigisterUser;
//# sourceMappingURL=users.js.map