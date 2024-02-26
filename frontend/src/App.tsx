import { useEffect } from "react";
import Hero from "./component/single/Hero";

export default function App() {
    
    useEffect(() => {
        const htmlElem = document.querySelector("html");
        const currTheme = localStorage.getItem("currTheme");
        if (htmlElem && currTheme) {
            htmlElem.classList.add(currTheme);
        }
    }, []);

    return (
        <section className=" w-full h-full flex flex-col">
            <div className="h-full w-full">
                <Hero />
            </div>
        </section>
    );
}
