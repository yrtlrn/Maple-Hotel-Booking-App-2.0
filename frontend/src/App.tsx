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
            <div className="h-full w-full">
                <Hero />
            </div>
            <div className=" bg-maple/80  absolute top-0 bottom-0 m-auto w-full h-fit">
                <SearchFormCard />
            </div>
        </section>
    );
}
