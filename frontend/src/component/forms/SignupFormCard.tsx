import { motion } from "framer-motion";
import { usePopupContext } from "../../context/PopupContext";

const SignupFormCard = () => {
    const { closeSignupPopup, openLoginPopup } = usePopupContext();

    const switchToLogin = () => {
        closeSignupPopup();
        openLoginPopup();
    };

    return (
        <motion.section
            className="w-96 h-fit bg-slate-700 dark:bg-slate-950 rounded-lg"
            initial={{ opacity: 0, y: "-100px" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100px" }}
        >
            <form className="p-4 flex flex-col gap-3">
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <label className="input input-bordered flex items-center gap-2">
                    First Name
                    <input
                        type="text"
                        className="grow overflow-hidden"
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    Last Name
                    <input
                        type="text"
                        className="grow overflow-hidden"
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    Email
                    <input
                        type="text"
                        className="grow overflow-hidden"
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    Password
                    <input
                        type="password"
                        className="grow overflow-hidden"
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <span className=" w-20">Confirm Password</span>
                    <input
                        type="password"
                        className="grow overflow-hidden"
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="btn w-full text-lg dark:text-white dark:border-white"
                >
                    Sign Up
                </button>
                <p className="text-center">
                    Already have an account?{" "}
                    <span className="link" onClick={switchToLogin}>
                        Log In
                    </span>
                </p>
            </form>
        </motion.section>
    );
};
export default SignupFormCard;