"use strict";
const userController = require("../controllers/users");
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => { res.send('Hello world!'); });
// router.post("/login", userController.rigisterUser);
router.post("/register", userController.rigisterUser);
module.exports = router;
//# sourceMappingURL=routes.js.map