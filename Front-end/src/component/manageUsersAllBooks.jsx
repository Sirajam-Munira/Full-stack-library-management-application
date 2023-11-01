import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const ManageUsersAllBooks = () => {
    const { userId } = useParams();
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/users/${userId}/history`)
            .then((response) => {
                setHistoryData(response.data);
            });
    }, [userId]);

    return (
        <div>
            <h1>User's All Books</h1>
            <table>
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Borrow Date</th>
                        <th>Due Date</th>
                        <th>Return Date</th>
                    </tr>
                </thead>
                <tbody>
                    {historyData.map((historyItem) => (
                        <tr key={historyItem.borrowId}>
                            <td>{historyItem.bookEntity.bookName}</td>
                            <td>{historyItem.bookEntity.bookAuthor}</td>
                            <td>{historyItem.borrowDate}</td>
                            <td>{historyItem.dueDate}</td>
                            <td>{historyItem.returnDate || "Not returned"}</td>
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

export default ManageUsersAllBooks