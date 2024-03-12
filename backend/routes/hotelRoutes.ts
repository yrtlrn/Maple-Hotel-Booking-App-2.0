import express, { Request, Response } from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { addNewHotel, getUserHotels } from "../controller/hotelControllers";
import { addHotelValidator } from "../middleware/validators/hotelValidators";
import { upload } from "../utils/multer";

const router = express.Router();

router
    .route("/")
    .post(
        authenticateUser,
        upload.array("images", 6),
        addHotelValidator,
        addNewHotel
    )
    .get(authenticateUser, getUserHotels);

export default router;
