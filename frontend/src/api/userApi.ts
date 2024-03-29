import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoginProps } from "../component/forms/LoginForm";

import { userSignupProps } from "../component/forms/SignupForm";
import { profileData, updateProps } from "../pages/ProfilePage";

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
        profileData: builder.query<profileData, null>({
            query: () => ({
                url: "/profile",
                method: "GET",
                credentials: "include",
            }),
        }),
        updateUser: builder.mutation<null, updateProps>({
            query: (formData: updateProps) => ({
                url: "/update",
                method: "POST",
                credentials: "include",
                body: formData,
                headers: {
                    "content-type": "application/json",
                },
            }),
        }),
    }),
});

export const {
    useLoginUserMutation,
    useSignupUserMutation,
    useVerifyUserQuery,
    useLogoutUserMutation,
    useProfileDataQuery,
    useUpdateUserMutation,
} = userApi;
