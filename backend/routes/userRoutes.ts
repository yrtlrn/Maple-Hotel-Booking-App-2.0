import express, { Request, Response } from "express";

// Validators
import {
    loginValidator,
    signupValidator,
} from "../middleware/validators/userValidators";

// Controllers
import {
    loginUser,
    logoutUser,
    signupUser,
    userDataProfile,
    verifyUser,
} from "../controller/userControllers";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", loginValidator, loginUser);
router.post("/signup", signupValidator, signupUser);
router.get("/verify", authenticateUser, verifyUser);
router.post("/logout", authenticateUser, logoutUser);
router.get("/profile", authenticateUser, userDataProfile)

export default router;
