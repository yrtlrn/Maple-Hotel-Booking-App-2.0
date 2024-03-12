import { NextFunction, Request, Response } from "express";
import { body, check, validationResult } from "express-validator";

const addHotelValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
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
        console.log(errors);
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

export { addHotelValidator };
