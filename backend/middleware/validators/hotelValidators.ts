import { NextFunction, Request, Response } from "express";
import { body, check, query, validationResult } from "express-validator";

const addHotelValidator = [
    body("name").notEmpty().withMessage("Name is required").escape(),
    body("city").notEmpty().withMessage("City is required").escape(),
    body("country").notEmpty().withMessage("Country is required").escape(),
    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .escape(),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required and must be a number"),
    body("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities is required"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({
                message: "Validation Error",
                error: errors.array(),
            });
            return;
        }
        next();
        return;
    },
];

const getAllHotelValidator = [
    query("page").notEmpty().isNumeric(),
    query("stars").notEmpty().isNumeric(),
    query("type").notEmpty().isString().escape(),
    query("facilities").optional({ values: "falsy" }).escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                message: "Validation Error",
                error: errors.array(),
            });
            return;
        }
        next();
        return;
    },
];

export { addHotelValidator, getAllHotelValidator };
