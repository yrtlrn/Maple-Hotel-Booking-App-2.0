import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../model/userModel";

// DESC     login the user
// MTH      POST /api/v1/users/login
// ACC      Public
const loginUser = asyncHandler(async(req: Request, res: Response) => {

    const {email,password} = req.body

    const user = await User.findOne({email})

    if (!user) {
        res.status(404)
        throw new Error("User does not exist")
    }

    if (await user.matchPassword(password)) {
        // update session
        // auth user
        res.status(200).json({message: 'Login In Successful'})
    } else {
        res.status(422)
        throw new Error("Email or password does not match")
    }
})

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
    res.status(201).json({ message: "Signup Successful", user: user });
});

export { loginUser, signupUser };
