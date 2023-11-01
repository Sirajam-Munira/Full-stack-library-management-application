import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../css/BorrowedBookCard.css"
import axiosInstance from "../utils/axiosInstance";

const ReservedBookCard = ({ book }) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const handleCancelClick = (bookId) => {
        axiosInstance
            .post(`/books/${bookId}/cancel-reservation`)
            .then((response) => {
                toast.success("Book reservation cancelled successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((error) => {
                toast.error("Error cancelling the reservation of the book!");
            });
    };


    return (
        <div>
            <div className="bbook-card">
                <div>
                    <img src={book.bookImageLink} alt={book.bookName} />
                </div>
                <div>
                    <h2>{book.bookName}</h2>
                    <p>{book.bookAuthor}</p>
                    <button onClick={() => navigate(`/books/${book.bookId}`)}>
                        View Details
                    </button>
                </div>
                <div>
                    <div>
                        <button onClick={() => handleCancelClick(book.bookId)}>
                            Cancel Reservation
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                toastStyle={{ fontSize: "14px" }}
                bodyClassName={"toastify-body"}
            />
        </div>
    );
};

export default ReservedBookCard;
