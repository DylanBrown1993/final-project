import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewRatings from './ReviewRatings.jsx'
import '../styles/Review.css';

const Review = () => {
  const [review, setReview] = useState(null);
  const { id } = useParams();

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
  }, [id]);

  if (!review) {
    return <div> Review Not Found </div>;
  }

  return (
    <div className="review-route">
      <div className="review-container">
        <h1>Review</h1>
        <div className="review-info">
          <h1>{review.title}</h1>
          {/* change user_id? */}
          <p>{review.user_id}</p>
          <ReviewRatings/>
          <p>{review.description}</p>
          <p>{review.body}</p>
          <p>{review.time_stamp}</p>
        </div>
      </div>
    </div>
  );
};
export default Review;