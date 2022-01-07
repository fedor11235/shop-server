"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersModel = void 0;
const { Schema, model } = require("mongoose");
const schemaUsers = new Schema({
    login: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    registerDate: { type: Date, default: Date.now },
    token: String
});
exports.usersModel = model('Users', schemaUsers);
//# sourceMappingURL=Users.js.map