import {rigisterUser, loginUser, isSignedIn} from "./controllers/users";
import {loadFotos, getFoto, deleteFoto} from "./controllers/photos";
import {deleteAlbum, changeAlbumTitle} from "./controllers/albums";
const express = require('express');
const router = express.Router();

router.post("/register", rigisterUser);
router.post("/login", loginUser);
router.get('/load-photos',isSignedIn, loadFotos)
router.post('/get-photo', getFoto)
router.delete('/delete-photo',isSignedIn, deleteFoto)
router.delete('/delete-album',isSignedIn, deleteAlbum)
router.put('/change-album-title',isSignedIn, changeAlbumTitle)

export=router;