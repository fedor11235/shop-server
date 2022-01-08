"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const mongoose = require("mongoose");
require("dotenv").config();
const app = (0, express_1.default)();
const port = 5000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json({ type: 'application/json' }));
app.use(routes_1.default);
mongoose.connect(process.env.DATABASE).then(() => { console.log(`MongoDB connection grate.`); }).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
});
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=app.js.map