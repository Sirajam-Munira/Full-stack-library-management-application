import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../css/BookDetails.css";
import useSelectedBookHook from "../hooks/useSelectedBookHook";
import axiosInstance from "../utils/axiosInstance";

const BookDetails = () => {

  const navigate = useNavigate();


  const { bookId } = useParams();
  const { book, errors } = useSelectedBookHook(bookId);

  const handleBorrowClick = () => {
    axiosInstance
      .get(`/books/${bookId}/borrow`)
      .then((response) => {
        toast.success("Book borrowed successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        toast.error("Error borrowing the book!");
      });
  };

  const handleReserveClick = () => {
    axiosInstance
      .post(`/books/${bookId}/reserve`)
      .then((response) => {
        toast.success("Book reserved successfully!");
      })
      .catch((error) => {
        toast.error("You have already reserved the book!");
      });
  };

  if (!book) {
    return <div>No book Found for {bookId}</div>;
  }

  return (
    <div>
      <div className="book-details">
        <img
          src={book.bookImageLink}
          alt={book.bookName}
          className="book-image"
        />
        <div className="book-info">
          <h2>{book.bookName}</h2>
          <p>{book.bookAuthor}</p>
          <p className="book-description">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          </p>
          <p className="availability-text">
            {book.bookStatus === "AVAILABLE" ? (
              "This book is available to borrow!! Borrow NOW."
            ) : (
              "This book is not available!! you can reserve this."
            )}
          </p>
          <div className="buttons">
            {book.bookStatus === "AVAILABLE" ? (
              <button className="borrow-button" onClick={handleBorrowClick}>Borrow</button>
            ) : (
              <button className="reserve-button" onClick={handleReserveClick}>Reserve</button>
            )}
            <button className="review-button" onClick={() => navigate(`/books/${book.bookId}/reviews`)}>View Reviews</button>
          </div>
        </div>
      </div>
      <div>
        <Link to="/books/all" className="back-link">Back to Book List</Link>
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

export default BookDetails;
