const { Schema, model } = require("mongoose");

const schemaUsers = new Schema({
  login: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registerDate: { type: Date, default: Date.now },
  token: String,
});

export const usersModel = model("Users", schemaUsers);

// import {Schema, model} from "mongoose";

// interface User {
//   login: String,
//   email: String,
//   password: String,
//   registerDate: Number,
// }

// const schemaUsers = new Schema<User>({
//     login: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     registerDate: { type: Date, default: Date.now },
//   });

// export  const usersModel = model<User>('Users', schemaUsers);
