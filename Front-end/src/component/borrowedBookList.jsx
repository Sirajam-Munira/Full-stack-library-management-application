import React from "react";
import useBorrowedBookListHook from "../hooks/useBorrowedBookListHook";
import BorrowedBookCard from "./borrowedBookCard";
import "../css/BookList.css";

const BorrowedBookList = () => {
    const { borrowedBooks, errors } = useBorrowedBookListHook();

    if (errors) {
        return <div className="error-message">Ooops! No Book was Borrowed by you!</div>;
    }

    return (
        <div className="book-list">
            <h1>Books Borrowed by you</h1>

            {borrowedBooks && borrowedBooks.length > 0 ? (
                <div className="card-container">
                    {borrowedBooks.map((book, i) => (
                        <BorrowedBookCard key={i} book={book} />
                    ))}
                </div>
            ) : (
                <div>No books have been borrowed by you.</div>
            )}
        </div>
    );
};

export default BorrowedBookList;
