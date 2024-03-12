import { useEffect } from "react";
import { useGetHotelsQuery } from "../api/hotelApi";
import AddHotelForm from "../component/forms/AddHotelForm";
import HotelCard from "../component/single/HotelCard";

const AddHotelPage = () => {
    
    useGetHotelsQuery(null);

    const { isSuccess, data } = useGetHotelsQuery(null);

    useEffect(() => {
        data;
    }, [data]);

    return (
        <section>
            {isSuccess ? <HotelCard hotelData={data} /> : <AddHotelForm />}
        </section>
    );
};
export default AddHotelPage;
