import express, { Request, Response } from "express";

// Validators
import {
    loginValidator,
    signupValidator,
    updateValidator,
} from "../middleware/validators/userValidators";
import { addHotelValidator } from "../middleware/validators/hotelValidators";

// Controllers
import {
    loginUser,
    logoutUser,
    signupUser,
    updateUserData,
    userDataProfile,
    verifyUser,
    addNewHotel,
    getUserHotels,
} from "../controller/userControllers";
import { authenticateUser } from "../middleware/authMiddleware";

import { upload } from "../utils/multer";

const router = express.Router();

router.post("/login", loginValidator, loginUser);
router.post("/signup", signupValidator, signupUser);
router.get("/verify", authenticateUser, verifyUser);
router.post("/logout", authenticateUser, logoutUser);
router.get("/profile", authenticateUser, userDataProfile);
router.post("/update", authenticateUser, updateValidator, updateUserData);
router
    .route("/hotels")
    .post(
        authenticateUser,
        upload.array("images", 6),
        addHotelValidator,
        addNewHotel
    )
    .get(authenticateUser, getUserHotels);
export default router;
