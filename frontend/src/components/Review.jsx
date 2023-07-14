import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewRatings from './ReviewRatings.jsx'
import '../styles/Review.css';

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
        console.error('Error fetching data', error);
      }
    };
    getReview();
    setLoading(false);
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    (loading) ? (
      <div>Review Loading...</div>
    ) : (
      (review) ? (
    <div className="review-route">
      <div className="review-container">
        <h1>Review</h1>
        <div className="review-info">
          <h1>{review.title}</h1>
          <p>{review.username}</p>
          <ReviewRatings reviewId={id}/>
          <p>{review.description}</p>
          <p>{review.body}</p>
          <p>{formatDate(review.time_stamp)}</p>
        </div>
      </div>
    </div>
      )
      :
      (<div>
        Not found
      </div>)
    )
  )
};
export default Review;
