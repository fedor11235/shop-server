"use strict";
const users_1 = require("./controllers/users");
const express = require('express');
const router = express.Router();
//CRUD create, read, update, delete
router.post("/register", users_1.rigisterUser);
router.post("/login", users_1.loginUser);
router.get('/load-photos', users_1.isSignedIn, users_1.cork);
router.get('/get-photo', users_1.isSignedIn, users_1.cork);
router.get('/delete-photo', users_1.isSignedIn, users_1.cork);
router.get('/delete-album', users_1.isSignedIn, users_1.cork);
router.get('/change-album-title', users_1.cork);
module.exports = router;
//# sourceMappingURL=routes.js.map