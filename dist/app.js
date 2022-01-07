const express = require('express');
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const allroutes = require('./routes');
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allroutes);
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log(`MongoDB connection grate.`); }).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
});
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=app.js.map