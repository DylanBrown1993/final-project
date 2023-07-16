import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewRatings from "./ReviewRatings";
import "../styles/Review.css";

const Review = () => {
  const [review, setReview] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReview = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/review/${id}`);
        setReview(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    getReview();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div>Review Loading...</div>;
  }

  if (!review) {
    return <div>Not found</div>;
  }

  return (
    <div className="id-review-route">
      <div className="id-review-container">
        <div className="id-review-image-container">
          <img
            src={review.header_image}
            alt=""
            className="id-review-image"
          />
          <div className="id-review-info-overlay">
            <h1 className="id-review-title">{review.title}</h1>
            <p className="id-review-username">{review.username}</p>
            <ReviewRatings reviewId={id} />
            <p className="id-review-description">{review.description}</p>
            <p className="id-review-body">{review.body}</p>
            <p className="id-review-time">{formatDate(review.time_stamp)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;


