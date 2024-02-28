import express, { Request, Response } from "express";
import "dotenv/config";
import { connectDB } from "./config/dbConfig";
//Middleware
import { notFound, createError } from "./middleware/errorMiddleware";
import userRouter from "./routes/userRoutes";
import cors from "cors";

const app = express();

// Middleware Uses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);

app.use("/api/v1/users", userRouter);

// Error Middleware
app.use(notFound);
app.use(createError);

const start = () => {
    try {
        connectDB();
        app.listen(process.env.SERVER_PORT, () =>
            console.log(`Listening to port: ${process.env.SERVER_PORT}`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
