import { useEffect } from "react";
import Hero from "./component/core/Hero";
import SearchFormCard from "./component/forms/SearchFormCard";

export default function App() {
    useEffect(() => {
        const htmlElem = document.querySelector("html");
        const currTheme = localStorage.getItem("currTheme");
        if (htmlElem && currTheme) {
            htmlElem.classList.add(currTheme);
        }
    }, []);

    return (
        <section className=" w-full h-full flex flex-col relative">
            <div className=" w-full">
                <Hero />
            </div>
            <div className="w-full mt-2">
                <SearchFormCard />
            </div>
        </section>
    );
}
