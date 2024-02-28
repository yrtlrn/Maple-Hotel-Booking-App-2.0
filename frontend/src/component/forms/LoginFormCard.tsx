import { motion } from "framer-motion";
import { usePopupContext } from "../../context/PopupContext";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../../api/apiClient";
import { toast } from "react-toastify";

export type userLoginProps = {
    email: string;
    password: string;
};

const LoginFormCard = () => {
    const { closeLoginPopup, openSignupPopup } = usePopupContext();

    const switchToSignup = () => {
        closeLoginPopup();
        openSignupPopup();
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<userLoginProps>();

    const mutation = useMutation(apiClient.loginUser, {
        onSuccess: () => {
            toast("Login Successful", { type: "success" });
            closeLoginPopup();
        },
        onError: (err: Error) => {
            toast(err.message, { type: "error" });
        },
    });

    const onSubmit = (data: userLoginProps) => {
        mutation.mutate(data);
    };

    return (
        <motion.section
            className="w-96 h-fit bg-slate-700 dark:bg-slate-950"
            initial={{ opacity: 0, y: "-100px" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "200px" }}
        >
            <form
                className="p-4 flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-bold text-center">Log In</h1>
                <label className="input input-bordered flex items-center gap-2">
                    Email
                    <input
                        type="email"
                        className="grow overflow-hidden"
                        required
                        {...register("email", {
                            required: "Please enter a Email",
                        })}
                    />
                </label>
                {errors.email && (
                    <span className="text-sm text-red-500">
                        {errors.email.message}
                    </span>
                )}
                <label className="input input-bordered flex items-center gap-2">
                    Password
                    <input
                        type="password"
                        className="grow overflow-hidden"
                        required
                        {...register("password", {
                            required:
                                "Please enter an password with more than 6 character",
                            minLength: 6,
                        })}
                    />
                </label>
                {errors.password && (
                    <span className="text-sm text-red-500">
                        {errors.password.message}
                    </span>
                )}
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
