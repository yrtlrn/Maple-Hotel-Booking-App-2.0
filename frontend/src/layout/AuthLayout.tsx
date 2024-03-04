import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import { getUserAuth } from "../app/slice/userSlice";

const AuthCheck = () => {
    // const fetchAuthCheck = async () => {
    //     const res = await fetch("http://localhost:3000/api/v1/users/verify", {
    //         method: "GET",
    //         credentials: "include",
    //     });
    //     return res;
    // };

    // const { data } = useQuery("authCheck", fetchAuthCheck);

    // if (data) {
    //     return (
    //         <section>{data.ok ? <Outlet /> : <div>Unauthorized</div>}</section>
    //     );
    // } else {
    //     return <div>An Error Occured</div>;
    // }

    const isLoggedIn = useAppSelector(getUserAuth);

    if (isLoggedIn) {
        return <section>{<Outlet />}</section>;
    } else {
        return (
            <section>
                <div>Unauthorized</div>
            </section>
        );
    }
};
export default AuthCheck;
