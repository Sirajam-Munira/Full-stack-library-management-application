const BookTable = ({ books, onEdit, onRemove, onReview }) => {

    return (
        <div>
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <td>Book ID</td>
                        <td>Book Name</td>
                        <td>Book Author</td>
                        <td>Book Status</td>
                        <td>Book Image Link</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {books &&
                        books.map((item) => (
                            <tr key={item.bookId}>
                                <td>{item.bookId}</td>
                                <td>{item.bookName}</td>
                                <td>{item.bookAuthor}</td>
                                <td>{item.bookStatus}</td>
                                <td>{item.bookImageLink}</td>
                                <td>
                                    <button onClick={() => onEdit(item.bookId)} className="btn btn-sm btn-success">Edit</button>
                                    <button onClick={() => onRemove(item.bookId)} className="btn btn-sm btn-danger">Remove</button>
                                    <button onClick={() => onReview(item.bookId)} className="btn btn-sm btn-danger">Review</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
export default BookTable