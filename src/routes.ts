import {rigisterUser, loginUser, isSignedIn, cork} from "./controllers/users";
const express = require('express');
const router = express.Router();

//CRUD create, read, update, delete
router.post("/register", rigisterUser);
router.post("/login", loginUser);

router.get('/load-photos',isSignedIn,cork)
router.get('/get-photo',isSignedIn, cork)
router.get('/delete-photo',isSignedIn,cork)
router.get('/delete-album',isSignedIn,cork)
router.get('/change-album-title',cork)

export=router;