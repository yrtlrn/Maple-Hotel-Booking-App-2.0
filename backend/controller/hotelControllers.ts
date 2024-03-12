import Hotel from "../model/hotelModel";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

// DESC     Get all hotels
// MTH      POST /api/v1/hotels
// ACC      Private
const getAllHotels = asyncHandler(async (req: Request, res: Response) => {
    const page = req.query.page || 1;

    const skip = ((page as number) - 1) * 5;

    const hotels = await Hotel.find().skip(skip).limit(5);
    if (!hotels) {
        res.status(404);
        throw new Error("No Hotels Found");
    }

    const hotelLength = await Hotel.countDocuments();

    res.status(200).json({
        hotels,
        pagination: {
            currPage: page as number,
            totalPage: Math.ceil(hotelLength / 5),
        },
    });
});

export { getAllHotels };
