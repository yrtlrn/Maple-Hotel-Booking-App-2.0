import express, { Request, Response } from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { getAllHotels } from "../controller/hotelControllers";

const router = express.Router();

router.get("/search", getAllHotels);

export default router;
