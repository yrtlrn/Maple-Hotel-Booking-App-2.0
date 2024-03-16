import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialStateProps = {
    page: number;

    stars: number;
    type: string;
    facilities: string[];
};

const initialState: InitialStateProps = {
    page: 1,
    stars: 0,
    type: "All",
    facilities: [],
};

const hotelSlice = createSlice({
    name: "hotelSlice",
    initialState,
    reducers: {
        changePageNumber: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        changeParams: (state = initialState, action) => {
            switch (action.type) {
                case "SORT_BY_STARS":
                    state.stars = action.payload;
                    return;
                case "SORT_BY_TYPE":
                    state.type = action.payload;
                    return;
                case "SORT_BY_FACILITIES":
                    state.facilities = action.payload;
                    return;
            }
        },
    },
});

export const { changePageNumber, changeParams } = hotelSlice.actions;

export default hotelSlice.reducer;
