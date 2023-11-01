import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const ManageUsersBorrowedBook = () => {
    const { userId } = useParams();
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/users/${userId}/borrowed-books`)
            .then((response) => {
                setHistoryData(response.data);
            });
    }, [userId]);

    return (
        <div>
            <h1>User's Currently Borrowed Books</h1>
            <table>
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {historyData.map((historyItem) => (
                        <tr key={historyItem.bookId}>
                            <td>{historyItem.bookName}</td>
                            <td>{historyItem.bookAuthor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/admin/users/all" className="btn btn-sm btn-danger">
                Back to the User List
            </Link>
        </div>
    )
};

export default ManageUsersBorrowedBook