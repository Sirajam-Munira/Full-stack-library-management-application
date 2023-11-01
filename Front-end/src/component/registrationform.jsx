import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "../css/RegistrationForm.css"

const RegistrationForm = () => {
    const navigate = useNavigate();

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [isRegistrationDone, setIsRegistrationDone] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);


    const handleRegister = (e) => {
        e.preventDefault();

        const data = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
            address: address,
            role: "USER"
        };

        setIsLoading(true);

        axiosInstance.post("/users/registration", data)
            .then(resp => {
                console.log(resp);
                setIsRegistrationDone(true);
                navigate("/login");
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
            ;
    }

    return (
        <div className="form-container">
            <h1>Register</h1>
            {isRegistrationDone && (
                <h2 className="success-message">Done</h2>
            )
            }
            {isLoading && <h1 className="loading-message">Loading...</h1>}
            <form onSubmit={handleRegister}>

                <div>
                    <h4>First Name</h4>
                    <input
                        value={firstname}
                        placeholder="Enter your first name"
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                </div>

                <div>
                    <h4>Last Name</h4>
                    <input
                        value={lastname}
                        placeholder="Enter your last name"
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                </div>

                <div>
                    <h4>Email</h4>
                    <input
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>

                <div>
                    <h4>Address</h4>
                    <input
                        value={address}
                        placeholder="Enter your address"
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    />
                </div>

                <div>
                    <h4>Password</h4>
                    <input
                        value={[password]}
                        placeholder="Enter password"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>

                {/* <div>
                    <h4>Role</h4>
                    <input />
                </div> */}

                <button type="submit">Register</button>

            </form>
        </div>
    );
};

export default RegistrationForm