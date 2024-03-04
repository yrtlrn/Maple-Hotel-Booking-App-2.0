import Vid1 from "../../assets/Hotel_1_Vid_merged.mp4";

const Hero = () => {
    return (
        <section className="w-full h-full bg-red-300 ">
            <video
                src={Vid1}
                loop
                autoPlay
                muted
                className="h-full object-cover"
            />
        </section>
    );
};
export default Hero;
