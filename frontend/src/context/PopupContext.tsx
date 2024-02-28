import React, { useContext, useState } from "react";

type PopupProps = {
    isLoginPopupOpen: boolean;
    isSignupPopupOpen: boolean;
    isBackdropOpen: boolean;

    closeSignupPopup: () => void;
    closeLoginPopup: () => void;
    openSignupPopup: () => void;
    openLoginPopup: () => void;
};

const PopupContext = React.createContext<PopupProps | undefined>(undefined);

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
    const [isBackdropOpen, setIsBackdropOpen] = useState(false);

    const closeSignupPopup = () => {
        setIsBackdropOpen(false);
        setIsSignupPopupOpen(false);
    };

    const closeLoginPopup = () => {
        setIsBackdropOpen(false);
        setIsLoginPopupOpen(false);
    };

    const openLoginPopup = () => {
        setIsBackdropOpen(true);
        setIsLoginPopupOpen(true);
    };

    const openSignupPopup = () => {
        setIsBackdropOpen(true);
        setIsSignupPopupOpen(true);
    };

    return (
        <PopupContext.Provider
            value={{
                isLoginPopupOpen,
                isSignupPopupOpen,
                isBackdropOpen,

                closeLoginPopup,
                closeSignupPopup,
                openLoginPopup,
                openSignupPopup,
            }}
        >
            {children}
        </PopupContext.Provider>
    );
};

export const usePopupContext = () => {
    const context = useContext(PopupContext);
    return context as PopupProps;
};
