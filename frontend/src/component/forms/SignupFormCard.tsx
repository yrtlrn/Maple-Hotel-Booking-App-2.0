import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
    toggleLoginPopup,
    toggleSignupPopup,
} from "../../app/slice/popupSlice";
import { useAppDispatch } from "../../app/hook";
import { useSignupUserMutation, useVerifyUserQuery } from "../../api/userApi";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export type userSignupProps = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignupFormCard = () => {
    const dispatch = useAppDispatch();

    const switchToLogin = () => {
        dispatch(toggleSignupPopup());
        dispatch(toggleLoginPopup());
    };

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
        useState(true);

    const switchVisibility = () => {
        const elem = document.getElementById("password");
        if (passwordVisibility) {
            elem?.setAttribute("type", "text");
        } else {
            elem?.setAttribute("type", "password");
        }
        setPasswordVisibility((prev) => !prev);
    };

    const cswitchVisibility = () => {
        const elem = document.getElementById("confirmPassword");
        if (confirmPasswordVisibility) {
            elem?.setAttribute("type", "text");
        } else {
            elem?.setAttribute("type", "password");
        }
        setConfirmPasswordVisibility((prev) => !prev);
    };

    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm<userSignupProps>();

    const [signUp] = useSignupUserMutation();

    const onSubmit = async (data: userSignupProps) => {
        try {
            const payload = await signUp(data).unwrap();
            if (payload) {
                toast((payload as { message: string }).message, {
                    type: "success",
                });
                dispatch(toggleSignupPopup());
                useVerifyUserQuery(null);
            }
        } catch (error) {
            const knownError = error as {
                data: { message: String; status: number };
            };
            toast(knownError.data.message, { type: "error" });
        }
    };

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
                        id="password"
                        required
                        {...register("password", {
                            required:
                                "Please enter a password with more than 6 character",
                            minLength: 6,
                        })}
                    />
                    {passwordVisibility ? (
                        <FaEye onClick={() => switchVisibility()} />
                    ) : (
                        <FaEyeSlash onClick={() => switchVisibility()} />
                    )}
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
                        id="confirmPassword"
                        required
                        {...register("confirmPassword", {
                            validate: (val) => {
                                if (val !== watch("password")) {
                                    return "Password don't match";
                                }
                            },
                        })}
                    />
                    {confirmPasswordVisibility ? (
                        <FaEye onClick={() => cswitchVisibility()} />
                    ) : (
                        <FaEyeSlash onClick={() => cswitchVisibility()} />
                    )}
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
