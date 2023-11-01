import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/axiosInstance";

const useUserHook = () => {

    const [users, setBooks] = useState([]);
    const [errors, setErrors] = useState();

    useEffect(() => {
        axiosInstance
            .get("/users/all")
            .then((resp) => {
                const userData = resp.data;
                setBooks(userData);
            })
            .catch((error) => {
                console.log(error);
                setErrors(error);
            });
    }, []);
    return { users, errors };
}
export default useUserHook 