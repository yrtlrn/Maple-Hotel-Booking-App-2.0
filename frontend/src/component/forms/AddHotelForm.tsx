import { useForm } from "react-hook-form";
import { hotelFacilities, hotelTypes } from "../../constant/variables";
import { useAddHotelMutation} from "../../api/hotelApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export type addHotelProps = {
    name: String;
    city: String;
    country: String;
    description: String;
    pricePerNight: Number;
    starRating: Number;
    type: String;
    facilities: String[];
    adultCount: Number;
    childCount: Number;
    images: FileList;
};

const AddHotelForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<addHotelProps>();

    const typeWatch = watch("type");
    const facilityWatch = watch("facilities");

    const [addHotel] = useAddHotelMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: addHotelProps) => {
        const formData = new FormData();
        formData.append("name", data.name as string);
        formData.append("city", data.city as string);
        formData.append("country", data.country as string);
        formData.append("description", data.description as string);
        formData.append("type", data.type as string);
        formData.append("pricePerNight", data.pricePerNight.toString());
        formData.append("starRating", data.starRating.toString());
        formData.append("adultCount", data.adultCount.toString());
        formData.append("childCount", data.childCount.toString());

        data.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility as string);
        });

        Array.from(data.images).forEach((image) => {
            formData.append("images", image);
        });

        try {
            const payload = await addHotel(formData).unwrap();
            if (payload) {
                toast((payload as { message: string }).message, {
                    type: "success",
                });
                navigate("/user/hotel");
                
            }
        } catch (error) {
            const knownError = error as {
                data: { message: string; status: number };
            };
            toast(knownError.data.message, { type: "error" });
        }
    };

    return (
        <form
            className="flex flex-col gap-2 justify-center items-center  h-full w-full"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
        >
            {/* Name */}
            <section className="w-1/2">
                <label className="flex text-xl" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    className="btn w-full md:text-xl"
                    id="name"
                    required
                    {...register("name", {
                        required: "Name of the hotel is required",
                    })}
                />
            </section>
            {errors.name && (
                <span className="text-xs text-white bg-red-500">
                    {errors.name.message}
                </span>
            )}
            {/* City and Country */}
            <section className="w-1/2 md:flex md:gap-2 md:justify-center">
                <div className="md:w-1/2">
                    <label className="flex text-xl" htmlFor="city">
                        City
                    </label>
                    <input
                        type="text"
                        className="btn w-full md:text-xl"
                        id="city"
                        required
                        {...register("city", {
                            required: "City is required",
                        })}
                    />
                </div>
                <div className="md:w-1/2">
                    <label className="flex text-xl" htmlFor="country">
                        Country
                    </label>
                    <input
                        type="text"
                        className="btn w-full md:text-xl"
                        id="country"
                        required
                        {...register("country", {
                            required: "country is required",
                        })}
                    />
                </div>
            </section>
            {errors.city && (
                <span className="text-xs text-white bg-red-500">
                    {errors.city.message}
                </span>
            )}
            {errors.country && (
                <span className="text-xs text-white bg-red-500">
                    {errors.country.message}
                </span>
            )}
            {/* Description */}
            <section className="w-1/2">
                <label className="flex text-xl" htmlFor="description">
                    Description
                </label>
                <textarea
                    maxLength={500}
                    rows={5}
                    minLength={10}
                    className="p-1 textarea w-full"
                    id="description"
                    required
                    {...register("description", {
                        required: "Description of the hotel is required",
                    })}
                />
            </section>
            {errors.description && (
                <span className="text-xs text-white bg-red-500">
                    {errors.description.message}
                </span>
            )}
            {/* Price Per Night */}
            <section className="w-1/2">
                <label className="flex text-xl" htmlFor="pricePerNight">
                    Price per Night
                </label>
                <input
                    type="number"
                    min={1}
                    className="btn w-full md:text-xl"
                    id="pricePerNight"
                    required
                    {...register("pricePerNight", {
                        required: "Price per night of the hotel is required",
                    })}
                />
            </section>
            {errors.pricePerNight && (
                <span className="text-xs text-white bg-red-500">
                    {errors.pricePerNight.message}
                </span>
            )}
            {/* Star Rating */}
            <section className="w-1/2">
                <label className="flex text-xl" htmlFor="starRating">
                    Star Rating
                </label>
                <input
                    type="number"
                    min={1}
                    max={5}
                    className="btn w-full md:text-xl"
                    id="starRating"
                    required
                    {...register("starRating", {
                        required: "Star Rating of the hotel is required",
                        minLength: {
                            value: 1,
                            message: "Minimun of 1",
                        },
                        maxLength: {
                            value: 5,
                            message: "Maxmimum of 5",
                        },
                    })}
                />
            </section>
            {errors.starRating && (
                <span className="text-xs text-white bg-red-500">
                    {errors.starRating.message}
                </span>
            )}
            {/* Type */}
            <section className="w-1/2">
                <label className="flex text-xl">Type</label>
                <div className="grid grid-cols-3 gap-2">
                    {hotelTypes.map((type) => (
                        <label key={type} className="label cursor-pointer">
                            <span
                                className={`btn w-full ${
                                    typeWatch === type
                                        ? "bg-primary hover:bg-primary text-black"
                                        : ""
                                }`}
                            >
                                {type}
                            </span>
                            <input
                                type="radio"
                                value={type}
                                className="radio hidden"
                                required
                                {...register("type")}
                            />
                        </label>
                    ))}
                </div>
            </section>
            {errors.type && (
                <span className="text-xs text-white bg-red-500">
                    {errors.type.message}
                </span>
            )}
            {/* Facilities */}
            <section className="w-1/2">
                <label className="flex text-xl">Facilities</label>
                <div className="grid grid-cols-3 gap-1">
                    {hotelFacilities.map((facility) => (
                        <label key={facility} className="label cursor-pointer">
                            <span
                                className={`btn w-full ${
                                    facilityWatch !== undefined &&
                                    Array.isArray(facilityWatch) &&
                                    facilityWatch.includes(facility)
                                        ? "bg-primary text-black hover:bg-primary"
                                        : ""
                                }`}
                            >
                                {facility}
                            </span>
                            <input
                                type="checkbox"
                                value={facility}
                                className="hidden"
                                {...register("facilities", {
                                    validate: () => {
                                        if (watch("facilities").length < 1) {
                                            return "At least select one";
                                        }
                                        return true;
                                    },
                                })}
                            />
                        </label>
                    ))}
                </div>
            </section>
            {errors.facilities && (
                <span className="text-xs text-white bg-red-500">
                    {errors.facilities.message}
                </span>
            )}
            {/* Adult and Child Count */}
            <section className="w-1/2 flex flex-col md:flex-row md:gap-2">
                <div className="flex flex-col md:w-full">
                    <label className="text-xl" htmlFor="adultCount">
                        Adult Count
                    </label>
                    <input
                        type="number"
                        min={1}
                        className="input"
                        id="adultCount"
                        required
                        {...register("adultCount", {
                            minLength: {
                                value: 1,
                                message: "Minimun of 1",
                            },
                        })}
                    />
                </div>
                <div className="flex flex-col md:w-full">
                    <label className="text-xl" htmlFor="childCount">
                        Child Count
                    </label>
                    <input
                        type="number"
                        className="input"
                        id="childCount"
                        {...register("childCount")}
                    />
                </div>
            </section>
            {errors.adultCount && (
                <span className="text-xs text-white bg-red-500">
                    {errors.adultCount.message}
                </span>
            )}
            {errors.childCount && (
                <span className="text-xs text-white bg-red-500">
                    {errors.childCount.message}
                </span>
            )}
            {/* Images */}
            <section className="w-1/2">
                <label htmlFor="images" className="flex text-xl">
                    Images
                </label>
                <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    className=""
                    {...register("images", {
                        validate: (image) => {
                            if (image.length < 1) {
                                return "Please select at least one image";
                            } else if (image.length > 6) {
                                return "Maximum of 6 images";
                            }
                            return true;
                        },
                    })}
                />
            </section>
            {errors.images && (
                <span className="text-xs text-white bg-red-500">
                    {errors.images.message}
                </span>
            )}
            <button type="submit" className="btn w-1/2 text-white text-2xl">
                Add Hotel
            </button>
        </form>
    );
};
export default AddHotelForm;

/*
    const letter = "A"
    document.querySelectorAll("input")[0].value = letter + " Hotel"
    document.querySelectorAll("input")[1].value = letter + " City"
    document.querySelectorAll("input")[2].value = letter + " Country"
    document.querySelectorAll("textarea")[0].value = `This is a hotel located in ${letter} City, ${letter} Country`
    document.querySelectorAll("input")[3].value = 10
    document.querySelectorAll("input")[4].value = 3
    document.querySelectorAll("input")[5].click()
    document.querySelectorAll("input")[20].click()
    document.querySelectorAll("input")[23].click()
    document.querySelectorAll("input")[24].click()
    document.querySelectorAll("input")[28].value = 1
    // child count document.querySelectorAll("input")[29].value = 1
*/
