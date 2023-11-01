import { Route, Routes } from 'react-router-dom';

import Header from "./component/header";
import HomePage from "./pages/home.page";
import RegistrationPage from './pages/registration.page';
import LoginPage from './pages/login.page';
import BookListPage from './pages/booklist.page';
import Authenticate from './component/authenticate';
import BookDetailsPage from './pages/bookdetails.page';
import BorrowedBookListPage from './pages/borrowedBookList.page';
import ReservedBookListPage from './pages/reservedBookList.page';
import BookReviewPage from './pages/bookReview.page';
import UserHistoryPage from './pages/userHistory.page';
import ManageBooksPage from './pages/manageBooks.page';
import CreateBook from './component/createBook';
import UpdateBook from './component/updateBook';
import ManageUsersPage from './pages/manageUsers.page';
import ManageUsersAllBookPage from './pages/manageUsersAllBook.page';
import ManageUsersBorrowedBookPage from './pages/manageUsersBorrowedBook.page';

// import Footer from './component/footer';
// import NotFoundPage from './pages/notfound.page';

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/registration" element={<RegistrationPage />} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route element={<Authenticate />}>
          <Route path="/books/all" element={<BookListPage />} />
          <Route path="/books/:bookId" element={<BookDetailsPage />} />
          <Route path="/users/:userId/borrowed-books" element={<BorrowedBookListPage />} />
          <Route path="/users/:userId/reserved-books" element={<ReservedBookListPage />} />
          <Route path="/books/:bookId/reviews" element={<BookReviewPage />} />
          <Route path="/users/:userId/history" element={<UserHistoryPage />} />
          <Route path="/admin/books/all" element={<ManageBooksPage />} />
          <Route path="/admin/books/create" element={<CreateBook />} />
          <Route path="/admin/books/update/:bookId" element={<UpdateBook />} />
          <Route path="/admin/users/all" element={<ManageUsersPage />} />
          <Route path="/admin/users/:userId/books" element={<ManageUsersAllBookPage />} />
          <Route path="/admin/users/:userId/borrowed-books" element={<ManageUsersBorrowedBookPage />} />

        </Route>

        {/* <Route path="*" element={<NotFoundPage />} /> */}

      </Routes>

      {/* <Footer /> */}
    </div>
  );
};

export default App
