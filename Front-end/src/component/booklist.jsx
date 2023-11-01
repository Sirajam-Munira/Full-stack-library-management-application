import React, { useEffect, useState } from "react"
import useBookHook from "../hooks/useBookHook";
import BookCard from "./bookcard";
import "../css/BookList.css"

const BookList = () => {
    const { books, errors } = useBookHook();

    const filteredBooks = books.filter((book) => !book.deleted);

    if (errors) {
        return <div>Error loading data. Please try again later.</div>;
    }

    return (
        <div className="book-list">
            <h1>BookList</h1>

            <div className="card-container">
                {filteredBooks &&
                    filteredBooks.map((book, i) => (
                        <BookCard key={i} book={book} />
                    ))
                }
            </div>
        </div>
    );
};

export default BookList;