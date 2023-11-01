import { useEffect, useState } from "react"
import axiosInstance from "../utils/axiosInstance";

const useSelectedBookHook = (bookId) => {
    const [book, setBook] = useState([]);
    const [errors, setErrors] = useState();

    useEffect(() => {
        axiosInstance
            .get(`/books/${bookId}`)
            .then((resp) => {
                const bookData = resp.data;
                setBook(bookData);
            })
            .catch((error) => {
                console.log(error);
                setErrors(error);
            });
    }, [bookId]);
    return { book, errors };
};

export default useSelectedBookHook;