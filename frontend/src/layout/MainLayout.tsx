import { Outlet } from "react-router-dom";
import Header from "../component/core/Header";
import Footer from "../component/core/Footer";

import { RootState } from "../app/store";
import { toggleLoginPopup, toggleSignupPopup } from "../app/slice/popupSlice";
import { AnimatePresence } from "framer-motion";
import LoginFormCard from "../component/forms/LoginForm";
import SignupFormCard from "../component/forms/SignupForm";
import { useAppDispatch, useAppSelector } from "../app/hook";

const MainLayout = () => {
    const isBackdropOpen = useAppSelector(
        (state: RootState) => state.popup.blackDropDown
    );

    const isLoginPopupOpen = useAppSelector(
        (state: RootState) => state.popup.loginPopup
    );

    const isSignupPopupOpen = useAppSelector(
        (state: RootState) => state.popup.signupPopup
    );

    const dispatch = useAppDispatch();

    return (
        <section className="flex flex-col relative  min-h-screen">
            {isBackdropOpen && (
                <div
                    className="absolute bg-black/50 w-full h-full z-20"
                    onClick={() =>
                        isLoginPopupOpen
                            ? dispatch(toggleLoginPopup())
                            : dispatch(toggleSignupPopup())
                    }
                />
            )}
            <div className="absolute left-0 right-0 mx-auto w-96 mt-14 z-30">
                <AnimatePresence mode="wait">
                    {isLoginPopupOpen && <LoginFormCard />}
                    {isSignupPopupOpen && <SignupFormCard />}
                </AnimatePresence>
            </div>

            <header className="border-b-2 p-2 mb-2 flex-none sticky top-0 z-10 bg-orange-400 dark:bg-black">
                <Header />
            </header>
            <main className="container mx-auto flex flex-1 mb-4   ">
                <section className="flex-1 ">
                    <Outlet />
                </section>
            </main>
            <footer className="flex-none">
                <Footer />
            </footer>
        </section>
    );
};
export default MainLayout;
