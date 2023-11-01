import { useEffect, useState } from "react"
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";

const useBorrowedBookListHook = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [errors, setErrors] = useState();
    const { userId } = useParams();

    useEffect(() => {
        axiosInstance
            .get(`/users/${userId}/borrowed-books`)
            .then((resp) => {
                const bookData = resp.data;
                setBorrowedBooks(bookData);
            })
            .catch((error) => {
                console.log(error);
                setErrors(error);
            });
    }, []);
    return { borrowedBooks, errors };
};

export default useBorrowedBookListHook;