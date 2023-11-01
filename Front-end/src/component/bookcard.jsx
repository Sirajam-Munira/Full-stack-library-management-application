import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/BookCard.css"

const BookCard = ({ book }) => {
    const navigate = useNavigate();
    return (
        <div className="book-card">
            <div>
                <img src={book.bookImageLink} alt={book.bookName} />
            </div>
            <h2>{book.bookName}</h2>
            <p>{book.bookAuthor}</p>
            <button onClick={() => navigate(`/books/${book.bookId}`)}>
                View Details
            </button>
        </div>
    );
};

export default BookCard;
