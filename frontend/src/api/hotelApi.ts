import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { hotelType } from "../../../backend/shared/type";

export const hotelApi = createApi({
    reducerPath: "hotelApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/v1/hotels",
    }),
    endpoints: (builder) => ({
        addHotel: builder.mutation<null, FormData>({
            query: (data: FormData) => ({
                url: "/",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),
        getHotels: builder.query<Array<hotelType>, null>({
            query: () => ({
                url: "/",
                method: "GET",
                credentials: "include",
            }),
        }),
    }),
});

export const { useAddHotelMutation, useGetHotelsQuery } = hotelApi;
