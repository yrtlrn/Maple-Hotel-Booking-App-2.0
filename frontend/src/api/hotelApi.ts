import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { hotelType } from "../../../backend/shared/type";

export const hotelApi = createApi({
    reducerPath: "hotelApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/v1/",
    }),
    endpoints: (builder) => ({
        addHotel: builder.mutation<null, FormData>({
            query: (data: FormData) => ({
                url: "users/hotels",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),
        getHotels: builder.query<
            {
                hotels: Array<hotelType>;
                pagination: { currPage: number; totalPage: number };
            },
            { page: number }
        >({
            query: (args) => {
                const { page } = args;
                return {
                    url: "users/hotels",
                    method: "GET",
                    credentials: "include",
                    params: { page },
                };
            },
        }),
        getAllHotels: builder.query<
            {
                hotels: Array<hotelType>;
                pagination: { currPage: number; totalPage: number };
            },
            {
                page: number;
                params: { stars: number; type: string; facilities: string[] };
            }
        >({
            query: (args) => {
                const { page, params } = args;
                return {
                    url: "hotels/search",
                    method: "GET",
                    credentials: "include",
                    params: { page, ...params },
                };
            },
        }),
    }),
});

export const { useAddHotelMutation, useGetHotelsQuery, useGetAllHotelsQuery } =
    hotelApi;
