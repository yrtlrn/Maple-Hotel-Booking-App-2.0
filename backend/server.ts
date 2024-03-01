import express from "express";
import "dotenv/config";
import { connectDB } from "./config/dbConfig";
import { rateLimit } from "express-rate-limit";

//Middleware
import { notFound, createError } from "./middleware/errorMiddleware";
import userRouter from "./routes/userRoutes";
import cors from "cors";
import { customerHeadersConfig } from "./middleware/headerMiddleware";
import { limiterConfig } from "./config/limiterConfig";
import { sessionConfig } from "./config/sessionConfig";

const app = express();

const limiter = rateLimit(limiterConfig);

// Middleware Uses
app.use(sessionConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);

app.use("/api/v1/users", limiter, userRouter);

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
