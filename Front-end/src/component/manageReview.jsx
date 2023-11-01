import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const ManageReview = () => {

    const { bookId } = useParams();

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/books/${bookId}/reviews`)
            .then((response) => {
                setReviews(response.data);
            });
    }, [bookId]);

    return (
        <div className="review-page">
            <h1>Reviews for this Book</h1>

            <div className="reviews-list">
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

export default ManageReview