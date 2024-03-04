import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";
import { RootState } from "../store";

type userSlice = {
    isUserAuth: boolean;
};

const initialState: userSlice = {
    isUserAuth: false,
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUserAuth: (state, action: PayloadAction<boolean>) => {
            state.isUserAuth = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.verifyUser.matchFulfilled,
            (state) => {
                state.isUserAuth = true;
            }
        ),
            builder.addMatcher(
                userApi.endpoints.loginUser.matchFulfilled,
                (state) => {
                    state.isUserAuth = true;
                }
            ),
            builder.addMatcher(
                userApi.endpoints.logoutUser.matchFulfilled,
                (state) => {
                    state.isUserAuth = false;
                }
            );
    },
});

// Selectors
export const getUserAuth = (state: RootState) => state.user.isUserAuth;

export const { setUserAuth } = userSlice.actions;

export default userSlice.reducer;
