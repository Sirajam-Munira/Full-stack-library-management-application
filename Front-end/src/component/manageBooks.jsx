import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import useBookHook from "../hooks/useBookHook";
import BookTable from "./bookTable";

const ManageBooks = () => {
    const navigate = useNavigate();
    const { books, errors } = useBookHook();

    const confirmRemove = (bookId) => {
        if (window.confirm('Do you want to remove it?')) {
            axiosInstance.delete("/books/delete/" + bookId)
                .then((res) => {
                    window.location.reload();
                }).catch((err) => {
                    console.log(err.message);
                })
        }
    }

    return (
        <div>
            <div>
                <div>
                    <h2>Manage Books</h2>
                </div>
                <div>
                    <Link to="/admin/books/create" className="btn btn-sm btn-primary">
                        Add New Book
                    </Link>
                </div>
                <div>
                    <BookTable
                        books={books}
                        onEdit={(bookId) => navigate(`/admin/books/update/${bookId}`)}
                        onRemove={(bookId) => confirmRemove(bookId)}
                        onReview={(bookId) => navigate(`/admin/books/${bookId}/reviews`)}
                    />
                </div>
            </div>

        </div>
    );
};

export default ManageBooks