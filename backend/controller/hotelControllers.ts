import Hotel from "../model/hotelModel";
import cloudinary from "../utils/cloudinary";

import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { hotelType } from "../shared/type";
import User from "../model/userModel";

// DESC     Add new hotel
// MTH      POST /api/v1/hotels
// ACC      Private
const addNewHotel = asyncHandler(async (req: Request, res: Response) => {
    const imageFiles = req.files as Express.Multer.File[];

    const newHotel: hotelType = req.body;

    // upload images to cloudinary
    const result = await uploadImage(imageFiles);
    newHotel.images = result;

    // Add User Id
    const user = await User.findOne({ email: req.session.email });
    if (!user) {
        res.status(404);
        throw new Error("User does not exist");
    }
    newHotel.userId = user._id;

    // Save to database
    const hotel = new Hotel(newHotel);
    await hotel.save();
    if (hotel) {
        res.status(201).json({ message: "Hotel added successful" });
    } else {
        res.status(500);
        throw new Error("Something went wrong");
    }
});

// DESC     Get User's Hotels
// MTH      Get /api/v1/hotels
// ACC      Private
const getUserHotels = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.session.email });
    if (!user) {
        res.status(404);
        throw new Error("user does not exist");
    }
    const hotels = await Hotel.find({ userId: user._id });
    if (!hotels) {
        res.status(200).json({ message: "User has not created any hotels" });
    }
    res.status(200).json(hotels);
});

// Utlities Function
async function uploadImage(imageFiles: Express.Multer.File[]) {
    const uploadPromise = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });
    const imageUrls = await Promise.all(uploadPromise);
    return imageUrls;
}


export { addNewHotel, getUserHotels };
