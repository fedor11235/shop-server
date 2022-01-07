"use strict";
const userController = require("../controllers/users");
const express = require("express");
let router = express.Router();
router.get('/', (req, res) => { res.send('Hello world!'); });
// router.post("/login", userController.getLogin);
router.post("/register", userController.rigisterUser);
module.exports = router;
//# sourceMappingURL=router.js.map