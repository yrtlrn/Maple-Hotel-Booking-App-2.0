import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
    res.status(404);
    res.json({ message: "The page does not exist" });
};

const createError = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errorStatus = res.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message;

    res.status(errorStatus!).json({
        message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
};

export { notFound, createError };
