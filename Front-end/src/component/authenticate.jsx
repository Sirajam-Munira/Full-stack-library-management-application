import { Navigate, Outlet } from "react-router-dom";

const Authenticate = () => {

    const token = localStorage.getItem('token')
    console.log(token);

    return (
        <div>
            {token ? <Outlet /> : <Navigate to="/users/login" />}
        </div>
    );
};

export default Authenticate