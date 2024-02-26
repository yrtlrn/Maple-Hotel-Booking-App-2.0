import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CiDark } from "react-icons/ci";

const variation = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
};

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    window.onclick = function (event) {
        if (event !== null && event.target !== null) {
            const element = event.target as Element;

            const isMatch = element.matches("#closeBtn");

            if (isMatch === false) {
                setMenuOpen(false);
            }
        }
    };

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
        <section className="container mx-auto flex items-center justify-between">
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
                <div className="relative flex flex-col">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="hover:shadow-lg hover:scale-105"
                        id="closeBtn"
                    >
                        <div
                            className="w-7 h-1 rounded-full mb-1 bg-white"
                            id="closeBtn"
                        />
                        <div
                            className="w-7 h-1 rounded-full mb-1 bg-white"
                            id="closeBtn"
                        />
                        <div
                            className="w-7 h-1 rounded-full bg-white"
                            id="closeBtn"
                        />
                    </button>
                    <AnimatePresence mode="wait">
                        <motion.nav
                            initial={{ opacity: 0 }}
                            animate={menuOpen ? "open" : "closed"}
                            variants={variation}
                            className="absolute -right-2 top-8 border-r-2 border-l-2 border-t-2 border-b-2 h-fit w-32 z-10"
                        >
                            <ul className="text-center bg-black rounded-sm dark:border-white">
                                <li className="p-2 border-b-2 border-b-slate-600 hover:bg-slate-800 transition ease-in-out hover:scale-105 dark:border-white hover:cursor-pointer">
                                    Item 1
                                </li>
                                <li className="p-2 border-b-2 border-b-slate-600 hover:bg-slate-800 transition ease-in-out dark:border-white hover:scale-105  hover:cursor-pointer">
                                    Item 2
                                </li>
                                <li className="p-2 border-b-slate-600 hover:bg-slate-800 transition ease-in-out hover:scale-105  hover:cursor-pointer">
                                    Item 3
                                </li>
                            </ul>
                        </motion.nav>
                    </AnimatePresence>
                </div>
            </section>
        </section>
    );
};
export default Header;
