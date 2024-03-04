import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../model/userModel";

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
export { loginUser, signupUser, verifyUser, logoutUser };
