import { userLoginProps } from "../component/forms/LoginFormCard";
import { userSignupProps } from "../component/forms/SignupFormCard";

const API_URL = "http://localhost:3000/api/v1/users";

const loginUser = async (data: userLoginProps) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    const resBody = await response.json();

    if (!response.ok) {
        throw new Error(resBody.message);
    }
};

const signupUser = async (data: userSignupProps) => {
    const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    const resBody = await response.json();

    if (!response.ok) {
        throw new Error(resBody.message);
    }
};

export { loginUser, signupUser };
