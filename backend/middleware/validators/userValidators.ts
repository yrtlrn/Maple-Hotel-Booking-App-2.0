import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const loginValidator = [
    body("email", "Please enter a valid email")
        .isEmail()
        .normalizeEmail()
        .escape(),
    body("password", "Password must be at least 6 characters")
        .isLength({ min: 6 })
        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({
                message: "A validation error occured!",
                error: error.array(),
            });
        } else {
            next();
            return;
        }
    },
];

const signupValidator = [
    body("firstName", "Must be at least 3 character")
        .isLength({ min: 3 })

        .escape(),
    body("lastName", "Must be at least 3 character")
        .isLength({ min: 3 })

        .escape(),
    body("email", "Please enter a valid email")
        .isEmail()
        .normalizeEmail()

        .escape(),
    body("password", "Must be at least 6 character")
        .isLength({ min: 6 })

        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.status(422).json({
                message: "A validator error occured",
                error: error.array(),
            });
        } else {
            next();
            return;
        }
    },
];

export { loginValidator, signupValidator };
