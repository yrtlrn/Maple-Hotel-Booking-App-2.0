import { useEffect } from "react";
import Hero from "./component/core/Hero";
import SearchFormCard from "./component/forms/SearchForm";
import { useGetAllHotelsQuery } from "./api/hotelApi";
import HotelCard from "./component/cards/HotelCard";

import { useAppSelector } from "./app/hook";

export default function App() {
    const pageNumber = useAppSelector((state) => state.hotel.page);
    const params = useAppSelector((state) => state.hotel.params);

    const { isSuccess, data } = useGetAllHotelsQuery({
        page: pageNumber,
        params,
    });

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
                {isSuccess ? <HotelCard hotelData={data} /> : ""}
            </div>
        </section>
    );
}
