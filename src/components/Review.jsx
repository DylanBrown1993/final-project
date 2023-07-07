import React from 'react';
import '../styles/Review.scss';
// import TopNavigationBar from '../components/TopNavigationBar';
// import PhotoList from '../components/PhotoList';


// a function for displaying the home page aspects such as the photos, topics, etc.
const Review = () => {
  return (
    <div className="review-route">
      <div className="review-container">
        <div className="info">
          <div className="date">
            <p>DATE</p>
          </div>
          <div className="title">
            <p>TITLE</p>
          </div>
          <div className="author">
            <p>AUTHOR</p>
          </div>
          <div className="rating">
            <p>STARTS</p>
          </div>
        </div>
        <div className="description">
          <p>DESCRIPTION</p>
        </div>
        <div className="body">
          <p>BODY</p>
        </div>
      </div>
    </div>
  );
};
export default Review;