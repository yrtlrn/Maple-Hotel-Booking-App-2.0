import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    page: 1,
    params: {},
};

const hotelSlice = createSlice({
    name: "hotelSlice",
    initialState,
    reducers: {
        changePageNumber: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        addParams: (state, action: PayloadAction<{}>) => {
            state.params = action.payload;
        },
    },
});

export const { changePageNumber,addParams } = hotelSlice.actions;

export default hotelSlice.reducer;
