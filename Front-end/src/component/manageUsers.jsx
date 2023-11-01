import { Link, useNavigate } from "react-router-dom";
import useUserHook from "../hooks/useUserHook";

const ManageUsers = () => {
    const navigate = useNavigate();
    const { users, errors } = useUserHook();

    return (
        <div>
            <div>
                <h2>Manage Users</h2>
            </div>
            <div>
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <td>User ID</td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Email</td>
                            <td>Address</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            users.map((item) => (
                                <tr key={item.userId}>
                                    <td>{item.userId}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <Link to={`/admin/users/${item.userId}/books`} className="btn btn-sm btn-primary" >History</Link>
                                        <Link to={`/admin/users/${item.userId}/borrowed-books`}>Borrowed Books</Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers