import { motion } from "framer-motion";
import { usePopupContext } from "../../context/PopupContext";

const LoginFormCard = () => {
    const { closeLoginPopup, openSignupPopup } = usePopupContext();

    const switchToSignup = () => {
        closeLoginPopup();
        openSignupPopup();
    };

    return (
        <motion.section
            className="w-96 h-fit bg-slate-700 dark:bg-slate-950"
            initial={{ opacity: 0, y: "-100px" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "200px" }}
        >
            <form className="p-4 flex flex-col gap-3">
                <h1 className="text-2xl font-bold text-center">Log In</h1>
                <label className="input input-bordered flex items-center gap-2">
                    Email
                    <input
                        type="email"
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
                <button
                    type="submit"
                    className="btn w-full text-lg dark:text-white dark:border-white"
                >
                    Log In
                </button>
                <p className="text-center">
                    Don't have an account?{" "}
                    <span className="link" onClick={switchToSignup}>
                        Sign Up
                    </span>
                </p>
            </form>
        </motion.section>
    );
};
export default LoginFormCard;
