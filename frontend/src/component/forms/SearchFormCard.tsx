import { format } from "date-fns";

const SearchFormCard = () => {
    const todayDate = format(new Date(), "MM/dd/yyyy");
    

    return (
        <form className="p-2 form-control text-center">
            <section className="grid grid-rows-1 grid-cols-5 gap-1 ">
                <label className="flex flex-col">
                    Destination
                    <input
                        type="text"
                        className="input input-bordered"
                        maxLength={20}
                        required
                    />
                </label>
                <label className="flex flex-col">
                    Adult
                    <input
                        type="number"
                        min={1}
                        className="input input-bordered"
                        required
                    />
                </label>
                <label className="flex flex-col">
                    Children
                    <input
                        type="number"
                        min={0}
                        className="input input-bordered"
                    />
                </label>
                <label className="flex flex-col">
                    Start Date
                    <input
                        type="date"
                        min={todayDate}
                        className="input input-bordered"
                        required
                    />
                </label>
                <label className="flex flex-col">
                    End Date
                    <input
                        type="date"
                        min={0}
                        className="input input-bordered"
                        required
                    />
                </label>
            </section>
            <section className="flex justify-center">
                <button type="submit" className="btn mt-2 w-1/2  text-xl">
                    Search
                </button>
            </section>
        </form>
    );
};
export default SearchFormCard;
