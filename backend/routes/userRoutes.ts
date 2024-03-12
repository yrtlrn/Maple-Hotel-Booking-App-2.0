import express, { Request, Response } from "express";

// Validators
import {
    loginValidator,
    signupValidator,
    updateValidator,
} from "../middleware/validators/userValidators";

// Controllers
import {
    loginUser,
    logoutUser,
    signupUser,
    updateUserData,
    userDataProfile,
    verifyUser,
} from "../controller/userControllers";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", loginValidator, loginUser);
router.post("/signup", signupValidator, signupUser);
router.get("/verify", authenticateUser, verifyUser);
router.post("/logout", authenticateUser, logoutUser);
router.get("/profile", authenticateUser, userDataProfile);
router.post("/update", authenticateUser, updateValidator, updateUserData);

export default router;
