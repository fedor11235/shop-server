"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const users_1 = require("./controllers/users");
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/register", users_1.rigisterUser);
app.post("/login", users_1.loginUser);
app.get('/load-photos', users_1.isSignedIn, users_1.cork);
app.get('/get-photo', users_1.isSignedIn, users_1.cork);
app.get('/delete-photo', users_1.isSignedIn, users_1.cork);
app.get('/delete-album', users_1.isSignedIn, users_1.cork);
app.get('/change-album-title', users_1.cork);
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log(`MongoDB connection grate.`); }).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
});
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=app.js.map