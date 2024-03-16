import { hotelType } from "../../../../backend/shared/type";
import { BsMap, BsBuilding } from "react-icons/bs";
import { BiStar, BiMoney, BiHotel } from "react-icons/bi";

import { useAppDispatch, useAppSelector } from "../../app/hook";
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
    };

    return (
        <section className="flex flex-col gap-2">
            {/* Top Pagination */}
            <div className="join flex justify-center gap-2">
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

            <section >
                {/* className="grid grid-cols-[1fr_4fr] md:grid-cols-[1fr_3fr] gap-2 items-start" */}
                {/* <div className="sticky top-20">
                    <Filter />
                </div> */}

                {/* Hotel Card */}
                <div className="flex flex-col gap-2">
                    {data.map((hotel) => (
                        <div
                            className="bg-slate-500 rounded-md p-2  grid grid-cols-1 grid-rows-[2fr_3fr] md:grid md:grid-cols-[2fr_3fr] md:grid-rows-1 md:items-center"
                            key={hotel.name}
                        >
                            <img
                                src={hotel.images[0]}
                                className="object-cover w-full max-h-[300px] md:max-h-[500px]"
                            />
                            <div className="pl-2 flex flex-col justify-between">
                                <div className="flex flex-col gap-3 mb-3">
                                    <h1 className="text-3xl">{hotel.name}</h1>
                                    <div className="flex flex-row justify-star items-center">
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
                                                      hotel.facilities.length -
                                                      3
                                                  } more`
                                                : ""}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-4 gap-2">
                                        <div className="flex flex-col border boder-slate-300 rounded-sm p-3 items-center justify-center">
                                            <BsMap />
                                            <p className="text-center text-wrap">
                                                <span>{hotel.city}</span>
                                                <span>, {hotel.country}</span>
                                            </p>
                                        </div>
                                        <div className="flex flex-col border boder-slate-300 rounded-sm p-3 items-center justify-center">
                                            <BiMoney />
                                            <p className="text-center text-wrap">
                                                ${hotel.pricePerNight} Per Night
                                            </p>
                                        </div>
                                        <div className="flex flex-col border boder-slate-300 rounded-sm p-3 items-center justify-center">
                                            <BiHotel />
                                            <p className="text-center text-wrap">
                                                {hotel.adultCount
                                                    ? hotel.adultCount > 1
                                                        ? hotel.adultCount +
                                                          " Adults, "
                                                        : hotel.childCount
                                                        ? hotel.adultCount +
                                                          " Adult, "
                                                        : hotel.adultCount +
                                                          " Adult"
                                                    : ""}
                                                {hotel.childCount
                                                    ? hotel.childCount +
                                                      " Children"
                                                    : ""}
                                            </p>
                                        </div>
                                        <div className="flex flex-col border boder-slate-300 rounded-sm p-3 items-center justify-center">
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
            <div className="join flex justify-center gap-2">
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
