const express=require('express');
const path =require ("path");
import * as userController from "./controllers/users";
// import cons from "consolidate";
// // import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
const mongoose = require ("mongoose");
const bodyParser = require('body-parser')
// import bluebird from "bluebird";

const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));
// app.engine('html', cons.swig)
// app.set("views", path.join(__dirname, "../views"));
// app.set("view engine", "html");
// app.use("/", express.static(path.join(__dirname, "../public")));


const mongoUrl = "mongodb+srv://Fedor:57Felasi@cluster0.nilhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true } ).then(
    () => { console.log(`MongoDB connection grate.`); },
).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    // process.exit();
});


app.get('/', (request, response) => { response.send('Hello world!'); });
app.get("/login", userController.getLogin);
app.post("/register", userController.rigisterUser);
app.listen(port, () => console.log(`Running on port ${port}`));