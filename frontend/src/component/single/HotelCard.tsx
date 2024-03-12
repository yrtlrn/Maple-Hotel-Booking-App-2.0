import { hotelType } from "../../../../backend/shared/type";
import { BsMap, BsBuilding } from "react-icons/bs";
import { BiStar, BiMoney, BiHotel } from "react-icons/bi";
import { Link } from "react-router-dom";


type HotelCardProps = {
    hotelData: Array<hotelType>;
};

const HotelCard = ({ hotelData }: HotelCardProps) => {

    

    return (
        <section className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
                <h1 className="font-bold text-3xl">My Hotels</h1>
                <Link
                    to="add"
                    className="btn text-2xl bg-transparent text-white border-white hover:bg-transparent"
                >
                    Add Hotel
                </Link>
            </div>
            {hotelData.map((hotel) => (
                <div className="bg-slate-500 rounded-md p-2 grid grid-cols-1 grid-rows-2 md:grid md:grid-cols-[2fr_3fr] md:grid-rows-1">
                    <img src={hotel.images[0]} className="object-cover" />
                    <div className="pl-2 flex flex-col justify-between">
                        <div className="flex flex-col gap-3 mb-3">
                            <h1 className="text-3xl">{hotel.name}</h1>
                            <div className="flex flex-row justify-star items-center">
                                {Array.from(
                                    { length: hotel.starRating },
                                    () => (
                                        <BiStar />
                                    )
                                )}
                            </div>
                            <p>{hotel.description}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="font-bold">Accommodation:</p>
                                {Array.from(
                                    hotel.facilities,
                                    (facility, index) => (
                                        <span className="">
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
                                                ? hotel.adultCount + " Adults, "
                                                : hotel.childCount
                                                ? hotel.adultCount + " Adult, "
                                                : hotel.adultCount + " Adult"
                                            : ""}
                                        {hotel.childCount
                                            ? hotel.childCount + " Children"
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
        </section>
    );
};
export default HotelCard;


