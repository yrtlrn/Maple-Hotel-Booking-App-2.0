import { useEffect, useState } from "react";
import Hero from "./component/core/Hero";
import SearchFormCard from "./component/forms/SearchForm";
import { useGetAllHotelsQuery } from "./api/hotelApi";
import HotelCard from "./component/cards/HotelCard";

import { useAppSelector } from "./app/hook";
import FilterForm from "./component/forms/FilterForm";

export default function App() {
  const pageNumber = useAppSelector(
    (state) => state.hotel.page
  );

  const [stars, setStars] = useState(0);
  const [type, setType] = useState("All");
  const [facilities, setFacilities] = useState<string[]>(
    []
  );

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
    <section className="flex flex-col w-full h-full ">
      <div className="relative w-full h-full">
        <Hero />
        <div className="absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <SearchFormCard />
        </div>
      </div>
      <div className="mt-3">
        <section className="flex flex-col md:grid md:grid-cols-[1fr_5fr] gap-2 items-start ">
          <div className="w-full p-2 pt-2 bg-red-200 md:sticky md:top-20 mt-14 md:w-full">
            <FilterForm
              setStars={setStars}
              setType={setType}
              facilities={facilities}
              setFacilities={setFacilities}
            />
          </div>
          {isSuccess ? (
            data.hotels.length >= 1 ? (
              <HotelCard hotelData={data} />
            ) : (
              <h1 className="text-2xl text-center mt-14">
                No Hotel Found
              </h1>
            )
          ) : (
            <h1>Something went wrong</h1>
          )}
        </section>
      </div>
    </section>
  );
}
