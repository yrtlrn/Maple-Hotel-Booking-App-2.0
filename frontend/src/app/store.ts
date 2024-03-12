import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./slice/popupSlice";
import { userApi } from "../api/userApi";
import { hotelApi } from "../api/hotelApi";
import userReducer from "./slice/userSlice";

export const store = configureStore({
    reducer: {
        popup: popupReducer,
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [hotelApi.reducerPath]: hotelApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            userApi.middleware,
            hotelApi.middleware,
        ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
