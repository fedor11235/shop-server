"use strict";
const users_1 = require("./controllers/users");
const photos_1 = require("./controllers/photos");
const albums_1 = require("./controllers/albums");
const express = require('express');
const router = express.Router();
router.post("/register", users_1.rigisterUser);
router.post("/login", users_1.loginUser);
router.get('/load-photos', users_1.isSignedIn, photos_1.loadFotos);
router.post('/get-photo', photos_1.getFoto);
router.delete('/delete-photo', users_1.isSignedIn, photos_1.deleteFoto);
router.delete('/delete-album', users_1.isSignedIn, albums_1.deleteAlbum);
router.put('/change-album-title', users_1.isSignedIn, albums_1.changeAlbumTitle);
module.exports = router;
//# sourceMappingURL=routes.js.map