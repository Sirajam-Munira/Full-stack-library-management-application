import { useEffect, useState } from "react"
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";

const useReservedBookListHook = () => {
    const [reservedBooks, setReservedBook] = useState([]);
    const [errors, setErrors] = useState();
    const { userId } = useParams();

    useEffect(() => {
        axiosInstance
            .get(`/users/${userId}/reserved-books`)
            .then((resp) => {
                const bookData = resp.data;
                setReservedBook(bookData);
            })
            .catch((error) => {
                console.log(error);
                setErrors(error);
            });
    }, []);
    return { reservedBooks, errors };
};

export default useReservedBookListHook;