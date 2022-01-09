import express from "express";

import { changeAlbumTitle, deleteAlbum } from "./controllers/albums";
import { deleteFoto, getFoto, loadFotos } from "./controllers/photos";
import { isSignedIn, loginUser, rigisterUser } from "./controllers/users";

const router = express.Router();

router.post("/register", rigisterUser);
router.post("/login", loginUser);
router.get("/load-photos", isSignedIn, loadFotos);
router.post("/get-photo", getFoto);
router.delete("/delete-photo", isSignedIn, deleteFoto);
router.delete("/delete-album", isSignedIn, deleteAlbum);
router.put("/change-album-title", isSignedIn, changeAlbumTitle);

export = router;
