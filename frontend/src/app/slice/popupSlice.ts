import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PopupSliceProps = {
    blackDropDown: boolean;
    loginPopup: boolean;
    signupPopup: boolean;
    menuOpen: boolean;
};

const initialState: PopupSliceProps = {
    blackDropDown: false,
    loginPopup: false,
    signupPopup: false,
    menuOpen: false,
};

export const popupSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        toggleDropDown: (state) => {
            state.blackDropDown = !state.blackDropDown;
        },
        toggleLoginPopup: (state) => {
            state.loginPopup = !state.loginPopup;
            state.blackDropDown = !state.blackDropDown
        },
        toggleSignupPopup: (state) => {
            state.signupPopup = !state.signupPopup;
            state.blackDropDown = !state.blackDropDown
        },
        toggleMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.menuOpen = action.payload;
        },
    },
});

export const {
    toggleDropDown,
    toggleLoginPopup,
    toggleSignupPopup,
    toggleMenuOpen,
} = popupSlice.actions;

export default popupSlice.reducer;
