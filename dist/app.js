const express = require('express');
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const allRouter = require('./routes/routes');
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', allRouter);
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log(`MongoDB connection grate.`); }).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
});
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=app.js.map