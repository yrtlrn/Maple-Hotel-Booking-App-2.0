import { useEffect, useState } from "react";
import imgArray from "../../assets/imgExport";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeImage = () => {
    if (currentIndex !== 6 && currentIndex < 7) {
      setCurrentIndex((prev) => prev + 1);
      return;
    } else if (currentIndex === 6) {
      setCurrentIndex(0);
      return;
    }
    setInterval(changeImage, 3000);
    return;
  };

  useEffect(() => {
    if (currentIndex === 6) {
      setCurrentIndex(0);
    } else {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 10000);

      // clearing interval
      console.log(currentIndex);
      return () => clearInterval(timer);
    }
  });

  return (
    <section className="w-full h-full ">
      <div className="w-full carousel h-[700px]">
        <div className="w-full carousel-item">
          <img
            src={imgArray[currentIndex]}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
