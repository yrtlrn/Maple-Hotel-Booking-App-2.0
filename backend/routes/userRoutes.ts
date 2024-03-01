import express, { Request, Response } from "express";

// Validators
import {
    loginValidator,
    signupValidator,
} from "../middleware/validators/userValidators";

// Controllers
import { loginUser, signupUser } from "../controller/userControllers";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", loginValidator, loginUser);
router.post("/signup", signupValidator, signupUser);
router.get("/verify", authenticateUser, (req: Request, res: Response) => {
    res.status(200).json({ message: "Authorized" });
});

export default router;
