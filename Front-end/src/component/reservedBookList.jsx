import React from "react";
import "../css/BookList.css";
import useReservedBookListHook from "../hooks/useReservedBookList";
import ReservedBookCard from "./reservedBookCard";

const ReservedBookList = () => {
    const { reservedBooks, errors } = useReservedBookListHook();

    if (errors) {
        return <div className="error-message">Oops!! No Book was Reserved by you!</div>;
    }

    return (
        <div className="book-list">
            <h1>Books Reserved by you</h1>

            {reservedBooks && reservedBooks.length > 0 ? (
                <div className="card-container">
                    {reservedBooks.map((book, i) => (
                        <ReservedBookCard key={i} book={book} />
                    ))}
                </div>
            ) : (
                <div>No books have been reserved by you.</div>
            )}
        </div>
    );
};

export default ReservedBookList;
