import { useEffect, useState } from "react";
import Hero from "./component/core/Hero";
import SearchFormCard from "./component/forms/SearchForm";
import { useGetAllHotelsQuery } from "./api/hotelApi";
import HotelCard from "./component/cards/HotelCard";

import { useAppSelector } from "./app/hook";
import FilterForm from "./component/forms/FilterForm";

export default function App() {
    const pageNumber = useAppSelector((state) => state.hotel.page);

    const [stars, setStars] = useState(0);
    const [type, setType] = useState("All");
    const [facilities, setFacilities] = useState<string[]>([]);

    const { isSuccess, data } = useGetAllHotelsQuery({
        page: pageNumber,
        params: { stars, type, facilities },
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
                <section className="grid grid-cols-[1fr_4fr] md:grid-cols-[1fr_3fr] gap-2 items-start">
                    <div className="sticky top-20 mt-14">
                        <FilterForm
                            setStars={setStars}
                            setType={setType}
                            facilities={facilities}
                            setFacilities={setFacilities}
                        />
                    </div>
                    {isSuccess ? <HotelCard hotelData={data} /> : ""}
                   
                </section>
            </div>
        </section>
    );
}
