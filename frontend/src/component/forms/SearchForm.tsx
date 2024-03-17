import { format } from "date-fns";

const SearchFormCard = () => {
  const todayDate = format(new Date(), "MM/dd/yyyy");

  return (
    <search>
      <form className="p-2 text-center border-t-2 border-b-2 form-control bg-maple dark:bg-black">
        <section className="grid grid-cols-1 grid-rows-4 gap-3 md:grid-rows-1 md:grid-cols-5 md:gap-1 ">
          <label className="flex flex-col ">
            Destination
            <input
              type="text"
              className="input input-bordered "
              maxLength={20}
              required
            />
          </label>
          <div className="flex gap-2 md:col-span-2 md:grid md:grid-row-1 md:grid-cols-2">
            <label className="flex flex-col w-full">
              Adult
              <input
                type="number"
                min={1}
                className="input input-bordered"
                required
              />
            </label>
            <label className="flex flex-col w-full">
              Children
              <input
                type="number"
                min={0}
                className="input input-bordered"
              />
            </label>
          </div>
          <label className="flex flex-col ">
            Start Date
            <input
              type="date"
              min={todayDate}
              className="input input-bordered"
              required
            />
          </label>
          <label className="flex flex-col ">
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
          <button
            type="submit"
            className="w-1/2 mt-2 text-xl text-white btn"
          >
            Search
          </button>
        </section>
      </form>
    </search>
  );
};
export default SearchFormCard;
