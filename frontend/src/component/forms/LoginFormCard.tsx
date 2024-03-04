import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
    toggleLoginPopup,
    toggleSignupPopup,
} from "../../app/slice/popupSlice";
import { useLoginUserMutation, useVerifyUserQuery } from "../../api/userApi";
import { useAppDispatch } from "../../app/hook";


export type userLoginProps = {
    email: string;
    password: string;
};

const LoginFormCard = () => {
    const dispatch = useAppDispatch();

    const switchToSignup = () => {
        dispatch(toggleLoginPopup());
        dispatch(toggleSignupPopup());
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<userLoginProps>();

    const [loginUser] = useLoginUserMutation();

    const onSubmit = async (formData: userLoginProps) => {
        try {
            const payload = await loginUser(formData).unwrap();
            if (payload) {
                toast((payload as { message: string }).message, {
                    type: "success",
                });
                dispatch(toggleLoginPopup());
                useVerifyUserQuery(null)
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
