import { useEffect, useState } from "react";
import { useGetHotelsQuery } from "../api/hotelApi";
import HotelCard from "../component/single/HotelCard";
import { Link } from "react-router-dom";

const AddHotelPage = () => {
    const [page, setPage] = useState(1);
    const getData = useGetHotelsQuery({ page });
    const { isSuccess, data } = useGetHotelsQuery({ page });

    useEffect(() => {
        getData;
    }, []);

    return (
        <section>
            <div className="flex flex-row justify-between">
                <h1 className="font-bold text-3xl">My Hotels</h1>
                <Link
                    to="add"
                    className="btn text-2xl bg-transparent text-white border-white hover:bg-transparent"
                >
                    Add Hotel
                </Link>
            </div>
            {isSuccess ? (
                <HotelCard hotelData={data} page={page} setPage={setPage} />
            ) : (
                <div>User does not have any hotels</div>
            )}
        </section>
    );
};
export default AddHotelPage;
