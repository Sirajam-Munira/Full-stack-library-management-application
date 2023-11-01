import React from "react";
import "../css/home.css";

const Home = () => {
    return (
        <>
            <div className="row">
                <div className="column1">
                    <h1>Eat, Read, Sleep, Repeat..</h1>
                    <p>
                        Welcome to our Online Library, where knowledge meets
                        convenience. Explore a universe of books, research,
                        and imagination at your fingertips. Browse, borrow,
                        and broaden your horizons from the comfort of your
                        screen. Welcome to a new chapter in reading.
                    </p>
                    <p><strong>How can you help?</strong></p>
                    <ul>
                        <li>You can borrow New Books</li>
                        <li>You can reserve a book if it is not available</li>
                        <li>You can add and view reviews of any book.</li>
                    </ul>
                </div>
                <div className="column2">
                    <img src="https://img.freepik.com/free-vector/young-lady-student-reading-book-studying-interior-library-woman-sitting-desk-shelves-bookcase-full-books-flat-vector-illustration-education-knowledge-readers-club-concept_74855-21149.jpg?w=1060&t=st=1698056878~exp=1698057478~hmac=ca47a10eafbca3c195c2892f63e32bda8c967a82c727e452a40a1188301dbb25" alt="libraryImage" className="animated-image" />
                </div>
            </div >
        </>

    );
};

export default Home