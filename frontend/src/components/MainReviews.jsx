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
    <div className="reviews-container">
    <h2>Reviews</h2>
    <div className="home-review-grid">
      {reviews.map((review, index) => (
        <div key={review.id} className={`home-review-item ${index === 0 ? 'home-review-full-width' : 'home-review-grid-item'}`}>
          <Link to={`/review/${review.id}`} className='review-link'>
            <div className={`home-review-content ${index === 0 ? 'home-review-first' : ''}`}>
              <h2 className="review-title">{review.title}</h2>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
  );
};
export default MainReview;