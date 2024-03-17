import { hotelType } from "../../../../backend/shared/type";
import { BsMap, BsBuilding } from "react-icons/bs";
import { BiStar, BiMoney, BiHotel } from "react-icons/bi";

import {
  useAppDispatch,
  useAppSelector,
} from "../../app/hook";
import { changePageNumber } from "../../app/slice/hotelSlice";

type HotelCardProps = {
  hotelData: {
    hotels: Array<hotelType>;
    pagination: { currPage: number; totalPage: number };
  };
};

const HotelCard = ({ hotelData }: HotelCardProps) => {
  const data = hotelData.hotels;

  const page = useAppSelector((state) => state.hotel.page);
  const dispatch = useAppDispatch();

  const changePage = (newPage: number) => {
    dispatch(changePageNumber(newPage));
    const hotelCardTop =
      document.getElementById("hotelCardTop");
    if (hotelCardTop) {
      hotelCardTop.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="flex flex-col gap-2"
      id="hotelCardTop"
    >
      {/* Top Pagination */}
      <div className="flex justify-center gap-2 join">
        {Array.from(
          { length: hotelData.pagination.totalPage },
          (_item, index) => (
            <button
              className={`joing-item btn dark:border-white ${
                page === index + 1
                  ? "btn-active bg-black"
                  : "bg-gray-800"
              }`}
              key={index}
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      <section>
        {/* Hotel Card */}
        <div className="flex flex-col gap-2">
          {data.map((hotel) => (
            <div
              className="bg-slate-500 border-black border-2 mx-3 dark:bg-black dark:border-white rounded-md p-2 gap-2 items-center  grid grid-cols-1 grid-rows-[2fr_3fr] md:grid md:grid-cols-[2fr_3fr] md:grid-rows-1 md:items-center"
              key={hotel.name}
            >
              <img
                src={hotel.images[0]}
                className="object-cover w-full max-h-[300px] md:max-h-[500px]"
              />
              <div className="flex flex-col justify-between pl-2">
                <div className="flex flex-col gap-3 mb-3">
                  <h1 className="text-3xl">{hotel.name}</h1>
                  <div className="flex flex-row items-center justify-star">
                    {Array.from(
                      { length: hotel.starRating },
                      (_item, index) => (
                        <BiStar key={index} />
                      )
                    )}
                  </div>
                  <p>{hotel.description}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="font-bold">
                      Accommodation:
                    </p>
                    {Array.from(
                      hotel.facilities,
                      (facility, index) => (
                        <span key={index}>
                          {index < 3
                            ? index === 2
                              ? facility + ""
                              : facility + ","
                            : ""}
                        </span>
                      )
                    )}
                    <span>
                      {hotel.facilities.length > 3
                        ? ` ...${
                            hotel.facilities.length - 3
                          } more`
                        : ""}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col items-center justify-center p-3 border rounded-sm boder-slate-300">
                      <BsMap />
                      <p className="text-center text-wrap">
                        <span>{hotel.city}</span>
                        <span>, {hotel.country}</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 border rounded-sm boder-slate-300">
                      <BiMoney />
                      <p className="text-center text-wrap">
                        ${hotel.pricePerNight} Per Night
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 border rounded-sm boder-slate-300">
                      <BiHotel />
                      <p className="text-center text-wrap">
                        {hotel.adultCount
                          ? hotel.adultCount > 1
                            ? hotel.adultCount + " Adults, "
                            : hotel.childCount
                              ? hotel.adultCount +
                                " Adult, "
                              : hotel.adultCount + " Adult"
                          : ""}
                        {hotel.childCount
                          ? hotel.childCount + " Children"
                          : ""}
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 border rounded-sm boder-slate-300">
                      <BsBuilding />
                      {hotel.type}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Pagination */}
      <div className="flex justify-center gap-2 join">
        {Array.from(
          { length: hotelData.pagination.totalPage },
          (_item, index) => (
            <button
              className={`joing-item btn ${
                page === index + 1
                  ? "btn-active bg-black"
                  : "bg-gray-800"
              }`}
              key={index}
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </section>
  );
};
export default HotelCard;
