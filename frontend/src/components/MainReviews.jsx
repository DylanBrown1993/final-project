import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/MainReviews.css';

const MainReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get("http://localhost:3001/reviews");
        setReviews(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    getReviews();
  }, []);

  return (
    <div className="main-review-route">
      <div className="main-review-container">
        <h1 className="main-review-title">Reviews</h1>
        <div className="main-review-content">
          <div className="review-grid">
            {reviews.map(review => (
              <div key={review.id} className="review-item">
                <Link to={`/review/${review.id}`}>
                  <h2>{review.title}</h2>
                </Link>
                <p>{review.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainReview;