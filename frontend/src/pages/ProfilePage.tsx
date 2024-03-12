import { useForm } from "react-hook-form";
import { useProfileDataQuery, useUpdateUserMutation } from "../api/userApi";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export type updateProps = {
    firstName: String;
    lastName: String;
    email: String;
    currentPassword: String;
    newPassword: String;
};

export type profileData = {
    email: string;
    firstName: string;
    lastName: string;
};

const ProfilePage = () => {
    const { register, reset, handleSubmit } = useForm<updateProps>();
    const { isSuccess, data } = useProfileDataQuery(null);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
        useState(true);

    const fillInputs = () => {
        const modifiedData = data as unknown as profileData;
        if (isSuccess) {
            reset(modifiedData);

            return;
        }
    };

    const [updateUser] = useUpdateUserMutation();

    const switchVisibility = () => {
        const elem = document.getElementById("currentPassword");
        if (passwordVisibility) {
            elem?.setAttribute("type", "text");
        } else {
            elem?.setAttribute("type", "password");
        }
        setPasswordVisibility((prev) => !prev);
    };

    const cswitchVisibility = () => {
        const elem = document.getElementById("newPassword");
        if (confirmPasswordVisibility) {
            elem?.setAttribute("type", "text");
        } else {
            elem?.setAttribute("type", "password");
        }
        setConfirmPasswordVisibility((prev) => !prev);
    };

    const onSubmit = async (formData: updateProps) => {
        try {
            const payload = await updateUser(formData).unwrap();
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

    useEffect(() => {
        fillInputs();
    }, [data]);

    return (
        <form
            className="flex flex-col gap-2 justify-center items-center  h-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <section className="grid grid-cols-2 grid-row-5 gap-2 h-full mt-12 mr-2">
                <label
                    htmlFor="firstName"
                    className=" flex items-center justify-center p-2"
                >
                    First Name -{" "}
                </label>
                <div className="flex items-center">
                    <input
                        type="text"
                        id="firstName"
                        className="btn text-white text-xl w-full"
                        {...register("firstName", {
                            required: "First Name is required",
                            minLength: {
                                value: 3,
                                message: "Must be at least 3 characters",
                            },
                        })}
                        required
                    />
                </div>
                <label
                    htmlFor="lastName"
                    className="text-2xl flex items-center justify-center p-2"
                >
                    Last Name -{" "}
                </label>
                <div className="flex items-center">
                    <input
                        type="text"
                        id="lastName"
                        className="btn text-white text-xl w-full"
                        {...register("lastName", {
                            required: "Last Name is required",
                            minLength: {
                                value: 3,
                                message: "Must be at least 3 characters",
                            },
                        })}
                        required
                    />
                </div>
                <label
                    htmlFor="email"
                    className="text-2xl flex items-center justify-center p-2"
                >
                    Email -{" "}
                </label>
                <div className="flex items-center">
                    <input
                        type="email"
                        id="email"
                        className="btn text-white text-xl w-full"
                        {...register("email", {
                            required: "Email is required",
                            minLength: {
                                value: 3,
                                message: "Must be at least 3 characters",
                            },
                        })}
                        required
                    />
                </div>
                <label
                    htmlFor="currentPassword"
                    className="text-2xl flex items-center justify-center p-2"
                >
                    Current Password -{" "}
                </label>
                <div className="relative flex items-center">
                    <input
                        type="password"
                        id="currentPassword"
                        className="btn text-white text-xl w-full"
                        {...register("currentPassword", {
                            required: "Current Password is required",
                            minLength: {
                                value: 6,
                                message: "Must be at least 6 characters",
                            },
                        })}
                        required
                    />
                    <div className="absolute right-2">
                        {passwordVisibility ? (
                            <FaEye onClick={() => switchVisibility()} />
                        ) : (
                            <FaEyeSlash onClick={() => switchVisibility()} />
                        )}
                    </div>
                </div>
                <label
                    htmlFor="newPassword"
                    className="text-2xl flex items-center justify-center p-2"
                >
                    New Password -{" "}
                </label>
                <div className="relative flex items-center">
                    <input
                        type="password"
                        id="newPassword"
                        className="btn text-white text-xl w-full"
                        {...register("newPassword", {
                            minLength: {
                                value: 6,
                                message: "Must be at least 3 characters",
                            },
                        })}
                    />
                    <div className="absolute right-2">
                        {confirmPasswordVisibility ? (
                            <FaEye onClick={() => cswitchVisibility()} />
                        ) : (
                            <FaEyeSlash onClick={() => cswitchVisibility()} />
                        )}
                    </div>
                </div>
            </section>
            <div className="flex items-center justify-center w-1/2">
                <button
                    type="submit"
                    className="btn w-full text-white text-2xl"
                >
                    Update
                </button>
            </div>
        </form>
    );
};
export default ProfilePage;
