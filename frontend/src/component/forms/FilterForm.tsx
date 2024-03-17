import {
  hotelFacilities,
  hotelTypes,
} from "../../constant/variables";

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
  const resetFilterForm = () => {
    setStars(0);
    setType("All");
    setFacilities([]);

    // Reset Star Rating
    const radioButton = document.querySelector(
      "input[type=radio]:checked"
    ) as HTMLInputElement;
    if (radioButton) {
      radioButton.checked = false;
    }
    const hotelCardTop =
      document.getElementById("hotelCardTop");
    if (hotelCardTop) {
      hotelCardTop.scrollIntoView({ behavior: "smooth" });
    }

    // Reset Types
    const typeSelect = document.querySelector("select");
    if (typeSelect) {
      typeSelect.value = "All";
    }
    // Reset Facility
    const facilitiesCheckbox = document.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    if (facilitiesCheckbox) {
      facilitiesCheckbox.forEach(
        (elem) =>
          ((elem as HTMLInputElement).checked = false)
      );
    }
  };

  return (
    <section className="">
      <form className="flex flex-col items-center w-full p-2 text-black bg-white border border-black dark:bg-black dark:text-white dark:border-white">
        <button
          type="button"
          className="text-xl text-black bg-green-100 btn dark:btn dark:text-xl dark:text-white hover:bg-maple/20"
          onClick={() => resetFilterForm()}
        >
          Reset
        </button>
        <div className="flex justify-around w-full md:flex-col">
          {/* Star Rating */}
          <div className="flex flex-col w-1/3 text-center md:w-full">
            <h2 className="text-lg md:text-xl lg:text-2xl">
              Star Rating
            </h2>
            <hr className="w-full h-1 bg-black" />
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
          </div>
          <br />
          {/* Types */}
          <div className="flex flex-col w-1/3 text-center md:w-full">
            <h2 className="text-lg md:text-xl lg:text-2xl">
              Type
            </h2>
            <hr className="w-full h-1 bg-black" />
            <label htmlFor="types" className="mt-2">
              <select
                className="bg-green-100 dark:bg-black dark:border-white dark:text-white border-black border-[1px]"
                onChange={(e) => setType(e.target.value)}
              >
                <option>All</option>
                {hotelTypes.map((hotel) => (
                  <option key={hotel}>{hotel}</option>
                ))}
              </select>
            </label>
          </div>
          <br />
        </div>
        <div className="w-full h-1 bg-black dark:bg-white" />
        {/* Facility */}
        <div className="flex flex-col text-center">
          <h2 className="text-lg md:text-xl lg:text-2xl">
            Facility
          </h2>
          <hr className="w-full h-1 bg-black" />
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
                    : setFacilities([
                        ...facilities,
                        facility,
                      ])
                }
              />
            </label>
          ))}
        </div>
      </form>
    </section>
  );
};
export default FilterForm;
