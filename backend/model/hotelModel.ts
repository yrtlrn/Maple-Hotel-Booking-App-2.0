import mongoose from "mongoose";
import { hotelType } from "../shared/type";

const hotelSchema = new mongoose.Schema<hotelType>({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pricePerNight: {
        type: Number,
        required: true,
    },
    starRating: {
        type: Number,
        required: true,
        length: {
            min: 1,
            max: 5,
        },
    },
    type: {
        type: String,
        required: true,
    },
    facilities: [
        {
            type: String,
            required: true,
        },
    ],
    adultCount: {
        type: Number,
        required: true,
        length: {
            min: 1,
        },
    },
    childCount: {
        type: Number,
    },
    images: [
        {
            type: String,
            required: true,
        },
    ],
});

const Hotel = mongoose.model<hotelType>("hotel", hotelSchema);

export default Hotel;
