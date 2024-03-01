import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";

const AuthCheck = () => {
    const fetchAuthCheck = async () => {
        const res = await fetch("http://localhost:3000/api/v1/users/verify", {
            method: "GET",
            credentials: "include",
        });
        return res;
    };

    const { data } = useQuery("authCheck", fetchAuthCheck);

    if (data) {
        return (
            <section>{data.ok ? <Outlet /> : <div>Unauthorized</div>}</section>
        );
    } else {
        return <div>An Error Occured</div>;
    }
};
export default AuthCheck;
