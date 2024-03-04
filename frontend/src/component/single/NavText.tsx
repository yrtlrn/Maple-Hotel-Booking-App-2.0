import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
    toggleLoginPopup,
    toggleSignupPopup,
} from "../../app/slice/popupSlice";
import { getUserAuth } from "../../app/slice/userSlice";
import { useLogoutUserMutation } from "../../api/userApi";
import { toast } from "react-toastify";

const NavText = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(getUserAuth);

    const [logout] = useLogoutUserMutation();

    const logOutFun = async () => {
        try {
            const payload = await logout(null).unwrap();
            if (payload) {
                toast((payload as { message: string }).message, {
                    type: "success",
                });
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
            <button
                className="btn text-xl hidden md:inline text-white bg-transparent hover:bg-maple/10 dark:bg-black dark:border-white "
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
            <button
                className="btn text-xl hidden md:inline text-white bg-transparent hover:bg-maple/10 dark:bg-black dark:border-white"
                onClick={() =>
                    isLoggedIn === false
                        ? dispatch(toggleSignupPopup())
                        : logOutFun()
                }
            >
                {isLoggedIn === false ? <p>Sign Up</p> : <p>Log Out</p>}
            </button>
        </>
    );
};
export default NavText;
