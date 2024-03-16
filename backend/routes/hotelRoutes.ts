import express from "express";

import { getAllHotels } from "../controller/hotelControllers";
import { getAllHotelValidator } from "../middleware/validators/hotelValidators";

const router = express.Router();

router.get("/search",getAllHotelValidator, getAllHotels);

export default router;
