import { useEffect } from "react";
import Hero from "./component/single/Hero";
import LoginFormCard from "./component/forms/LoginFormCard";
import { usePopupContext } from "./context/PopupContext";
import { AnimatePresence } from "framer-motion";
import SignupFormCard from "./component/forms/SignupFormCard";
import SearchFormCard from "./component/forms/SearchFormCard";

export default function App() {
    const { isLoginPopupOpen, isSignupPopupOpen } = usePopupContext();

    useEffect(() => {
        const htmlElem = document.querySelector("html");
        const currTheme = localStorage.getItem("currTheme");
        if (htmlElem && currTheme) {
            htmlElem.classList.add(currTheme);
        }
    }, []);

    return (
        <section className=" w-full h-full flex flex-col relative">
            <div className="h-full w-full">
                <Hero />
            </div>
            <div className=" bg-maple/80  absolute top-0 bottom-0 m-auto w-full h-fit">
                <SearchFormCard />
            </div>
            <div className="absolute left-0 right-0 mx-auto w-96 mt-4 z-30">
                <AnimatePresence mode="wait">
                    {isLoginPopupOpen && <LoginFormCard />}
                    {isSignupPopupOpen && <SignupFormCard />}
                </AnimatePresence>
            </div>
        </section>
    );
}
