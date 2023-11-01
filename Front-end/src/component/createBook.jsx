import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const CreateBook = () => {

    const [formData, setFormData] = useState({
        bookName: "",
        bookAuthor: "",
        bookImageLink: "",
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        const data = {
            bookName: formData.bookName,
            bookAuthor: formData.bookAuthor,
            bookImageLink: formData.bookImageLink,
        }

        console.log(data);

        axiosInstance.post(`/books/create`, data)
            .then(resp => {
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
                                <h2>Add new Book</h2>
                            </div>
                            <div className="card-body">
                                <div className="column">
                                    <div>
                                        <label>Book Name</label>
                                        <input
                                            value={formData.bookName}
                                            onChange={(e) => setFormData({ ...formData, bookName: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label>Book Author</label>
                                        <input
                                            value={formData.bookAuthor}
                                            onChange={(e) => setFormData({ ...formData, bookAuthor: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label>Book Image Link</label>
                                        <input
                                            value={formData.bookImageLink}
                                            onChange={(e) => setFormData({ ...formData, bookImageLink: e.target.value })}
                                        />
                                    </div>

                                </div>
                                <div className="col-lg-12" style={{ textAlign: "center" }}>
                                    <div className="form-group">
                                        <button className="btn btn-sm btn-success" type="submit">
                                            Save
                                        </button>
                                        <Link to="/patient/all" className="btn btn-sm btn-danger">
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
    )
}

export default CreateBook