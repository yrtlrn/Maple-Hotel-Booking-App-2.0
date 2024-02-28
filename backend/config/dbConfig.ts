import mongoose from "mongoose";

export const connectDB = () => {
    const connected = mongoose.connect(process.env.MONGO_URI!);
    if (!connected) {
        console.log("Could not connect to DB");
        throw new Error("Cound not connected to DB");
    }
    console.log("Connected to DB");
};
