import React from "react";

const BookForm = ({ formData, handleChange }) => {
    return (
        <div>
            <div className="col-lg-12">
                <div className="form-group">
                    <label>Book Name</label>
                    <input
                        value={formData.bookName}
                        onChange={(e) => handleChange("bookName", e.target.value)}
                        className="form-control"
                    />
                </div>
            </div>

            <div className="col-lg-12">
                <div className="form-group">
                    <label>Book Author</label>
                    <input
                        value={formData.bookAuthor}
                        onChange={(e) => handleChange("bookAuthor", e.target.value)}
                        className="form-control"
                    />
                </div>
            </div>

            <div className="col-lg-12">
                <div className="form-group">
                    <label>Book Image Link</label>
                    <input
                        value={formData.bookImageLink}
                        onChange={(e) => handleChange("bookImageLink", e.target.value)}
                        className="form-control"
                    />
                </div>
            </div>
        </div>
    );
};

export default BookForm;
