import Vid1 from "../../assets/Hotel_1_Vid_merged.mp4";

const Hero = () => {
    return (
        <section className="w-full h-full bg-red-300 ">
            {/* <video
                loop
                autoPlay
                muted
                className="object-cover h-[810px] w-full fixed left-0 right-0 "
                src={Vid1}
            /> */}
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
