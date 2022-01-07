import * as userController from "../controllers/users";
import * as express from "express";
const router = express.Router()

router.get('/', (req, res) => { res.send('Hello world!'); });
// router.post("/login", userController.getLogin);
router.post("/register", userController.rigisterUser);

export = router;
