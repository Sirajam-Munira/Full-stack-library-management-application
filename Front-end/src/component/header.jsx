import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/header.css";
import jwtDecode from "jwt-decode";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');


    return (
        <div className="header">
            <div className="left-links">
                <Link to="/">Home</Link>
                {token && role == "USER" && (
                    <>
                        <Link to="/books/all">Book List</Link>
                        <Link to={`/users/${userId}/borrowed-books`}>Borrowed Books</Link>
                        <Link to={`/users/${userId}/reserved-books`}>Reserved Books</Link>
                        <Link to={`/users/${userId}/history`}>History</Link>
                    </>
                )}
                {token && role == "ADMIN" && (
                    <>
                        <Link to={`admin/books/all`}>Manage Books</Link>
                        <Link to={`/admin/users/all`}>Manage Users</Link>
                    </>
                )}
            </div>

            <div className="right-links">
                {!token ? (
                    <>
                        <Link to="/users/registration">Register</Link>
                        <Link to="/users/login">Login</Link>
                    </>
                ) : (
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("userId");
                            localStorage.removeItem("role");

                            navigate("/");
                        }}
                    >
                        Log out
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
