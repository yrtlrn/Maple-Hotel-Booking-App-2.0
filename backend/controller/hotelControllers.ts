import Hotel from "../model/hotelModel";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

// DESC     Get all hotels
// MTH      POST /api/v1/hotels
// ACC      Private
const getAllHotels = asyncHandler(async (req: Request, res: Response) => {
    const page = req.query.page || 1;

    const stars = req.query.stars as string;
    const type = req.query.type as string;
    const facilities = req.query.facilities as string[];

    const skip = ((page as number) - 1) * 5;

    let filterUsed = false;

    let filterOptions = {};

    if (stars !== "0" && stars) {
        filterOptions = { ...filterOptions, starRating: stars };
        filterUsed = true;
    }

    if (type && type !== "All") {
        filterOptions = { ...filterOptions, type: type };
        filterUsed = true;
    }

    if (facilities.length > 0) {
        filterOptions = { ...filterOptions, facilities: { $in: [facilities] } };
        filterUsed = true;
    }
    const hotels = await Hotel.find(filterOptions).skip(skip).limit(5);

    if (!hotels) {
        res.status(404);
        throw new Error("No Hotels Found");
    }

    const hotelLength = filterUsed
        ? hotels.length
        : await Hotel.countDocuments();

    

    res.status(200).json({
        hotels,
        pagination: {
            currPage: page as number,
            totalPage: Math.ceil(hotelLength / 5),
        },
    });
});

export { getAllHotels };
