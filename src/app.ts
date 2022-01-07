const express=require('express');
require("dotenv").config();
const mongoose = require ("mongoose");
const bodyParser = require('body-parser')
import {rigisterUser, loginUser, isSignedIn, cork} from "./controllers/users";

const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));


app.post("/register", rigisterUser);
app.post("/login", loginUser);
app.get('/load-photos',isSignedIn,cork)
app.get('/get-photo',isSignedIn, cork)
app.get('/delete-photo',isSignedIn,cork)
app.get('/delete-album',isSignedIn,cork)
app.get('/change-album-title',cork)

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true} ).then(
    () => { console.log(`MongoDB connection grate.`); },
).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
});


app.listen(port, () => console.log(`Running on port ${port}`));