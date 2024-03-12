import { useEffect, useState } from "react";
import Hero from "./component/core/Hero";
import SearchFormCard from "./component/forms/SearchForm";
import { useGetAllHotelsQuery } from "./api/hotelApi";
import HotelCard from "./component/single/HotelCard";

export default function App() {
    const [page, setPage] = useState(1);

    const { isSuccess, data } = useGetAllHotelsQuery(
        { page },
        
    );


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
            <div className="mt-3">
                {isSuccess ? (
                    <HotelCard hotelData={data} page={page} setPage={setPage} />
                ) : (
                    ""
                )}
            </div>
        </section>
    );
}
