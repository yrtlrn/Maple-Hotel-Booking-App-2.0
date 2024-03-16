import { hotelFacilities, hotelTypes } from "../../constant/variables";

type FilterFormProps = {
    setStars: (arg0: number) => void;
    setType: (arg0: string) => void;
    facilities: string[];
    setFacilities: (arg0: string[]) => void;
};

const FilterForm = ({
    setStars,
    setType,
    facilities,
    setFacilities,
}: FilterFormProps) => {
    

    return (
        <section className="bg-orange-300 ">
            <form className="bg-white text-black rounded-md flex flex-col items-center p-2">
                <h2 className="text-lg md:text-xl lg:text-2xl">Star Rating</h2>
                <hr className="bg-black w-full h-1" />
                <label className="">
                    <span>5 Star </span>
                    <input
                        type="radio"
                        name="stars"
                        onChange={() => setStars(5)}
                    />
                </label>
                <label className="">
                    <span>4 Star </span>
                    <input
                        type="radio"
                        name="stars"
                        onChange={() => setStars(4)}
                    />
                </label>
                <label className="">
                    <span>3 Star </span>
                    <input
                        type="radio"
                        name="stars"
                        onChange={() => setStars(3)}
                    />
                </label>
                <label className="">
                    <span>2 Star </span>
                    <input
                        type="radio"
                        name="stars"
                        onChange={() => setStars(2)}
                    />
                </label>
                <label className="">
                    <span>1 Star </span>
                    <input
                        type="radio"
                        name="stars"
                        onChange={() => setStars(1)}
                    />
                </label>
                <label className="">
                    <span>All </span>
                    <input
                        type="radio"
                        name="stars"
                        onChange={() => setStars(0)}
                    />
                </label>
                <br />
                <h2 className="text-lg md:text-xl lg:text-2xl">Type</h2>
                <hr className="bg-black w-full h-1" />
                <label htmlFor="types" className="mt-2">
                    <select
                        className="bg-white border-black border-[1px]"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option>All</option>
                        {hotelTypes.map((hotel) => (
                            <option key={hotel}>{hotel}</option>
                        ))}
                    </select>
                </label>
                <br />
                <h2 className="text-lg md:text-xl lg:text-2xl">Facility</h2>
                <hr className="bg-black w-full h-1" />
                {...hotelFacilities.map((facility) => (
                    <label key={facility}>
                        <span className="text-sm">{facility} </span>
                        <input
                            type="checkbox"
                            onChange={() =>
                                facilities.includes(facility)
                                    ? setFacilities(
                                          facilities.filter(
                                              (fac) => fac !== facility
                                          )
                                      )
                                    : setFacilities([...facilities, facility])
                            }
                        />
                    </label>
                ))}
            </form>
        </section>
    );
};
export default FilterForm;
