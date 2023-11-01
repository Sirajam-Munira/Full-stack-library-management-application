import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import "../css/ReviewPage.css"

const BookReview = () => {

    const { bookId } = useParams();

    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        reviewText: "",
        rating: ""
    })

    useEffect(() => {
        axiosInstance.get(`/books/${bookId}/reviews`)
            .then((response) => {
                setReviews(response.data);
            });
    }, [bookId]);

    const handleAddReview = () => {
        axiosInstance
            .post(`/books/${bookId}/reviews/create`, newReview)
            .then((response) => {
                setReviews((prevReviews) => [response.data, ...prevReviews]);
                setNewReview({ rating: "", reviewText: "" });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="review-page">
            <h1>Reviews for this Book</h1>
            <div className="add-review-form">
                <h2>What do you think about this book?</h2>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        placeholder="Rate between 0 to 10"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                    />
                </div>
                <div>
                    <label>Review:</label>
                    <textarea
                        value={newReview.reviewText}
                        onChange={(e) =>
                            setNewReview({ ...newReview, reviewText: e.target.value })
                        }
                    />
                </div>
                <button onClick={handleAddReview}>Submit Review</button>
            </div>
            <div className="reviews-list">
                <h2>Reviews</h2>
                {reviews.map((review) => (
                    <div key={review.reviewId} className="review-item">
                        <div className="rating">Rating: {review.rating} stars</div>
                        <div className="text">Review: {review.reviewText}</div>
                        <div className="reviewer-info">
                            Date: {review.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookReview