import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoginProps } from "../component/forms/LoginFormCard";

import { userSignupProps } from "../component/forms/SignupFormCard";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/v1/users",
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<null, userLoginProps>({
            query: (data) => ({
                url: "/login",
                method: "POST",
                credentials: "include",
                body: data,
                headers: {
                    "content-type": "application/json",
                },
            }),
        }),
        signupUser: builder.mutation<null, userSignupProps>({
            query: (data) => ({
                url: "/signup",
                method: "POST",
                credentials: "include",
                body: data,
                headers: {
                    "content-type": "application/json",
                },
            }),
        }),
        logoutUser: builder.mutation<null, null>({
            query: () => ({
                url: "/logout",
                method: "POST",
                credentials: "include",
            }),
        }),
        verifyUser: builder.query<null, null>({
            query: () => ({
                url: "/verify",
                method: "GET",
                credentials: "include",
            }),
        }),
    }),
});

export const {
    useLoginUserMutation,
    useSignupUserMutation,
    useVerifyUserQuery,
    useLogoutUserMutation
} = userApi;
