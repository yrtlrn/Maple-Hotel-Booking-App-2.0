import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CiDark } from "react-icons/ci";
import { useVerifyUserQuery } from "../../api/userApi";
import Nav from "../single/Nav";

const Header = () => {
    useVerifyUserQuery(null);
    const changeTheme = () => {
        const htmlElem = document.querySelector("html");
        if (htmlElem) {
            if (htmlElem.classList.contains("dark")) {
                htmlElem.classList.remove("dark");
                localStorage.removeItem("currTheme");
            } else {
                htmlElem.classList.add("dark");
                localStorage.setItem("currTheme", "dark");
            }
        }
    };

    return (
        <section className="container mx-auto flex items-center justify-between ">
            <Link to="/">
                <motion.h1
                    className="text-3xl font-bold"
                    whileHover={{ fontSize: "40px" }}
                    whileTap={{ fontSize: "20px" }}
                >
                    MHB
                </motion.h1>
            </Link>
            <section className=" flex items-center gap-2">
                <button onClick={changeTheme}>
                    <CiDark size={30} />
                </button>
                <nav>
                    <Nav />
                </nav>
            </section>
        </section>
    );
};
export default Header;
