import { useEffect, useState } from "react"
import axiosInstance from "../utils/axiosInstance";

const useBookHook = () => {
    const [books, setBooks] = useState([]);
    const [errors, setErrors] = useState();

    useEffect(() => {
        axiosInstance
            .get("/books/all")
            .then((resp) => {
                const bookData = resp.data;
                setBooks(bookData);
            })
            .catch((error) => {
                console.log(error);
                setErrors(error);
            });
    }, []);
    return { books, errors };
};

export default useBookHook;