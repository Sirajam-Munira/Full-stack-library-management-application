import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../css/LoginForm.css"

const LoginForm = () => {

    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);


    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        axiosInstance.post("/users/login", data)
            .then(resp => {
                const userData = resp.data
                console.log(userData);
                localStorage.setItem("token", userData.Authorization);
                localStorage.setItem("userId", userData.userId);
                localStorage.setItem("role", userData.role);
                navigate("/");
            })
            .catch((error) => {
                setError("Invalid email or password. Please try again.");
                console.log(error);
            })
            ;
    }

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <h4>Email</h4>
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>

                <div>
                    <h4>Password</h4>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm