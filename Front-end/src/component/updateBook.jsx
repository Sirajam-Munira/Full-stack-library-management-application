import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const UpdateBook = () => {
    const { bookId } = useParams();
    const [formData, setFormData] = useState({
        bookName: "",
        bookAuthor: "",
        bookImageLink: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get(`/books/${bookId}`)
            .then((response) => {
                const bookData = response.data;
                setFormData(bookData);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [bookId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance
            .put(`/books/update/${bookId}`, formData)
            .then((resp) => {
                const bookData = resp.data;
                console.log(bookData);
                navigate("/admin/books/all");
            })
            .catch((error) => {
                console.log(error.message);
                throw error;
            });
    };

    return (
        <div>
            <div className="row" style={{ marginTop: "60px" }}>
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title" style={{ textAlign: "center" }}>
                                <h2>Edit Book</h2>
                            </div>
                            <div className="card-body">
                                <div className="column">
                                    <div>
                                        <label>Book Name</label>
                                        <input
                                            value={formData.bookName}
                                            onChange={(e) =>
                                                setFormData({ ...formData, bookName: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label>Book Author</label>
                                        <input
                                            value={formData.bookAuthor}
                                            onChange={(e) =>
                                                setFormData({ ...formData, bookAuthor: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label>Book Image Link</label>
                                        <input
                                            value={formData.bookImageLink}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    bookImageLink: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12" style={{ textAlign: "center" }}>
                                    <div className="form-group">
                                        <button className="btn btn-sm btn-success" type="submit">
                                            Save
                                        </button>
                                        <Link to="/admin/books/all" className="btn btn-sm btn-danger">
                                            Cancel
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBook;
