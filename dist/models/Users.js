"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const { Schema, model } = require("mongoose");
// interface User {
//     name: string;
//     email: string;
//     password: string;
//   }
// 2. Create a Schema corresponding to the document interface.
const schemaUser = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: String
});
// 3. Create a Model.
exports.userModel = model('User', schemaUser);
//# sourceMappingURL=Users.js.map