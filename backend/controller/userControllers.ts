import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../model/userModel";
import Hotel from "../model/hotelModel";
import cloudinary from "../utils/cloudinary";
import { hotelType } from "../shared/type";

declare module "express-session" {
    export interface SessionData {
        authorized: boolean;
        email: string;
    }
}

// DESC     login the user
// MTH      POST /api/v1/users/login
// ACC      Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("User does not exist");
    }

    if (await user.matchPassword(password)) {
        // update session
        // auth user
        req.session.authorized = true;
        req.session.email = email;
        res.status(200).json({
            message: "Login In Successful",
        });
    } else {
        res.status(422);
        throw new Error("Email or password does not match");
    }
});

// DESC     add new user
// MTH      POST /api/v1/users/signup
// ACC      Public
const signupUser = asyncHandler(async (req: Request, res: Response) => {
    const duplicateEmail = await User.findOne({ email: req.body.email });
    if (duplicateEmail) {
        res.status(422);
        throw new Error("Please choose a different email");
    }

    const user = await User.create(req.body);

    if (!user) {
        res.status(400);
        throw new Error("A problem occured when signing up!!!");
    }
    req.session.authorized = true;
    req.session.email = req.body.email;
    res.status(201).json({ message: "Signup Successful", user: user });
});

// DESC     verify if user logged in
// MTH      GET /api/v1/users/verify
// ACC      Private
const verifyUser = (req: Request, res: Response) => {
    res.status(200).json({ message: "Authorized" });
};

// DESC     logout a user
// MTH      POST /api/v1/users/logout
// ACC      private
const logoutUser = (req: Request, res: Response) => {
    req.session.destroy(() => {});
    res.cookie("sessCookie", "", {
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logout Out Successful" });
};

// DESC     get user data for profile page
// MTH      POST /api/v1/users/profile
// ACC      private
const userDataProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne(
        { email: req.session.email },
        "email firstName lastName"
    );
    if (!user) {
        res.status(404);
        throw new Error("user does not exist");
    }
    res.status(200).json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    });
});

// DESC     update user data
// MTH      POST /api/v1/users/update
// ACC      private
const updateUserData = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({
        email: req.session.email,
    });

    if (!user) {
        res.status(404);
        throw new Error("user does not exist");
    }

    const { firstName, lastName, email, currentPassword, newPassword } =
        req.body;

    if (await user.matchPassword(currentPassword)) {
        const duplicateEmailCheck = await User.findOne({
            email: email,
            _id: { $ne: user._id },
        });
        if (duplicateEmailCheck) {
            res.status(422).json({ message: "Please use a different email" });
        }

        let updateData = {};

        if (newPassword) {
            updateData = {
                firstName,
                lastName,
                email,
                password: newPassword,
            };
        } else {
            updateData = {
                firstName,
                lastName,
                email,
            };
        }

        const updatedUser = await User.findByIdAndUpdate(user._id, updateData, {
            new: true,
            runValidators: true,
        });
        if (updatedUser) {
            req.session.email = email;
            res.status(200).json({ message: "Profile Update Successful" });
        } else {
            res.status(400).json({ message: "Something went wrong" });
        }
    } else {
        res.status(422).json({ message: "Incorrect Password" });
    }
});

// DESC     Add new hotel
// MTH      POST /api/v1/users/hotels
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
// MTH      Get /api/v1/users/hotels
// ACC      Private
const getUserHotels = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.session.email });
    const page = req.query.page || 1;
    const skip = ((page as number) - 1) * 5;
    if (!user) {
        res.status(404);
        throw new Error("user does not exist");
    }
    const hotels = await Hotel.find({ userId: user._id }).skip(skip).limit(5);
    if (!hotels) {
        res.status(200).json({ message: "User has not created any hotels" });
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

export {
    loginUser,
    signupUser,
    verifyUser,
    logoutUser,
    userDataProfile,
    updateUserData,
    addNewHotel,
    getUserHotels,
};
