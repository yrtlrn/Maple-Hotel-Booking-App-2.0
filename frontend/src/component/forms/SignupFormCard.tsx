import { motion } from "framer-motion";
import { usePopupContext } from "../../context/PopupContext";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
export type userSignupProps = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignupFormCard = () => {
    const { closeSignupPopup, openLoginPopup } = usePopupContext();

    const switchToLogin = () => {
        closeSignupPopup();
        openLoginPopup();
    };

    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm<userSignupProps>();

    const mutation = useMutation(apiClient.signupUser, {
        onSuccess: () => {
            toast("Signup Successful", { type: "success" });
            closeSignupPopup();
        },
        onError: (err: Error) => {
            toast(err.message, { type: "error" });
        },
    });

    const onSubmit = (data: userSignupProps) => mutation.mutate(data);

    return (
        <motion.section
            className="w-96 h-fit bg-slate-700 dark:bg-slate-950 rounded-lg"
            initial={{ opacity: 0, y: "-100px" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100px" }}
        >
            <form
                className="p-4 flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <label className="input input-bordered flex items-center gap-2">
                    First Name
                    <input
                        type="text"
                        className="grow overflow-hidden"
                        required
                        {...register("firstName", {
                            required: "Please enter a first name",
                            minLength: {
                                value: 3,
                                message: "Must be more than 3 character",
                            },
                        })}
                    />
                </label>
                {errors.firstName && (
                    <span className="text-sm text-red-500">
                        {errors.firstName.message}
                    </span>
                )}
                <label className="input input-bordered flex items-center gap-2">
                    Last Name
                    <input
                        type="text"
                        className="grow overflow-hidden"
                        required
                        {...register("lastName", {
                            required: "Please enter a last name",
                            minLength: {
                                value: 3,
                                message: "Must be more than 3 character",
                            },
                        })}
                    />
                </label>
                {errors.lastName && (
                    <span className="text-sm text-red-500">
                        {errors.lastName.message}
                    </span>
                )}
                <label className="input input-bordered flex items-center gap-2">
                    Email
                    <input
                        type="email"
                        className="grow overflow-hidden"
                        required
                        {...register("email", {
                            required: "Please enter a email",
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
                                "Please enter a password with more than 6 character",
                            minLength: 6,
                        })}
                    />
                </label>
                {errors.password && (
                    <span className="text-sm text-red-500">
                        {errors.password.message}
                    </span>
                )}
                <label className="input input-bordered flex items-center gap-2">
                    <span className=" w-20">Confirm Password</span>
                    <input
                        type="password"
                        className="grow overflow-hidden"
                        required
                        {...register("confirmPassword", {
                            validate: (val) => {
                                if (val !== watch("password")) {
                                    return "Password don't match";
                                }
                            },
                        })}
                    />
                </label>
                {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                        {errors.confirmPassword.message}
                    </p>
                )}
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
