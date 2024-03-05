import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import { getUserAuth } from "../app/slice/userSlice";

const AuthCheck = () => {

    const isLoggedIn = useAppSelector(getUserAuth);

    if (isLoggedIn) {
        return <section className=" w-full container h-full">{<Outlet />}</section>;
    } else {
        return (
            <section>
                <div>Unauthorized</div>
            </section>
        );
    }
};
export default AuthCheck;
