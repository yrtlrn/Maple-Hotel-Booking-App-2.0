import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
    toggleLoginPopup,
    toggleSignupPopup,
    toggleMenuOpen,
} from "../../app/slice/popupSlice";
import { getUserAuth } from "../../app/slice/userSlice";
import { useLogoutUserMutation } from "../../api/userApi";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

const Nav = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const menuOpen = useAppSelector((state) => state.popup.menuOpen);

    const isLoggedIn = useAppSelector(getUserAuth);

    const [logout] = useLogoutUserMutation();

    window.onclick = function (event) {
        if (event !== null && event.target !== null) {
            const element = event.target as Element;

            const isMatch = element.matches("#closeBtn");

            if (isMatch === false) {
                dispatch(toggleMenuOpen(false));
            }

            return;
        }
    };

    const logOutFun = async () => {
        try {
            const payload = await logout(null).unwrap();
            if (payload) {
                toast((payload as { message: string }).message, {
                    type: "success",
                });
                navigate("/");
            }
        } catch (error) {
            const knownError = error as {
                data: { message: String; status: number };
            };
            toast(knownError.data.message, { type: "error" });
        }
    };

    return (
        <>
            {/* Text NavBar */}
            <section className="gap-2 hidden md:visible md:flex">
                <button
                    className="btn text-xl hidden md:inline text-white bg-transparent border-white hover:bg-maple/10 dark:bg-black dark:border-white "
                    onClick={() =>
                        isLoggedIn === false ? dispatch(toggleLoginPopup()) : ""
                    }
                >
                    {isLoggedIn === false ? (
                        <p>Log In</p>
                    ) : (
                        <Link to="/user/profile">Profile</Link>
                    )}
                </button>

                {isLoggedIn === false ? (
                    ""
                ) : (
                    <button className="btn text-xl hidden md:inline text-white border-white bg-transparent hover:bg-maple/10 dark:bg-black dark:border-white">
                        <Link to="/user/hotel">My Hotels</Link>
                    </button>
                )}

                <button
                    className="btn text-xl hidden md:inline text-white bg-transparent border-white hover:bg-maple/10 dark:bg-black dark:border-white"
                    onClick={() =>
                        isLoggedIn === false
                            ? dispatch(toggleSignupPopup())
                            : logOutFun()
                    }
                >
                    {isLoggedIn === false ? <p>Sign Up</p> : <p>Log Out</p>}
                </button>
            </section>

            {/* 3 Lines NavBar */}
            <section className="relative flex flex-col md:hidden">
                <button
                    onClick={() =>
                        menuOpen
                            ? dispatch(toggleMenuOpen(false))
                            : dispatch(toggleMenuOpen(true))
                    }
                    className="transition duration-500 hover:shadow-lg hover:scale-125 "
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

                <AnimatePresence
                    initial={false}
                    mode="wait"
                    onExitComplete={() => {}}
                >
                    {menuOpen && (
                        <motion.nav
                            initial={{ opacity: 0, x: "-50px" }}
                            animate={{ opacity: 1, x: -7 }}
                            exit={{ opacity: 0, x: "-50px" }}
                            className="absolute -right-2 top-8 border-r-2 border-l-2 border-t-2 border-b-2 h-fit w-32 z-10"
                        >
                            <ul className="text-center bg-black rounded-sm dark:border-white">
                                <li
                                    className="p-2 border-b-2 border-b-slate-600 hover:bg-slate-800 transition ease-in-out hover:scale-105 dark:border-white hover:cursor-pointer"
                                    onClick={() =>
                                        isLoggedIn === false
                                            ? dispatch(toggleLoginPopup())
                                            : ""
                                    }
                                >
                                    {isLoggedIn === false ? (
                                        <p>Log In</p>
                                    ) : (
                                        <Link to="/user/profile">Profile</Link>
                                    )}
                                </li>
                                <li
                                    className="p-2 border-b-2 border-b-slate-600 hover:bg-slate-800 transition ease-in-out dark:border-white hover:scale-105  hover:cursor-pointer"
                                    onClick={() =>
                                        isLoggedIn === false
                                            ? dispatch(toggleSignupPopup())
                                            : logOutFun()
                                    }
                                >
                                    {isLoggedIn === false ? (
                                        <p>Sign Up</p>
                                    ) : (
                                        <p>Log Out</p>
                                    )}
                                </li>

                                {isLoggedIn === false ? (
                                    ""
                                ) : (
                                    <li className="p-2 border-b-2 border-b-slate-600 hover:bg-slate-800 transition ease-in-out dark:border-white hover:scale-105  hover:cursor-pointer">
                                        <Link to="/user/hotel">Hotels</Link>
                                    </li>
                                )}
                            </ul>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
};
export default Nav;
