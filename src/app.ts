import "dotenv/config";

import bodyParser from "body-parser";
import express from "express";

import allroutes from "./routes";
const mongoose = require("mongoose");

const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(allroutes);

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log(`MongoDB connection grate.`);
  })
  .catch((err) => {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
  });

app.listen(port, () => console.log(`Running on port ${port}`));
