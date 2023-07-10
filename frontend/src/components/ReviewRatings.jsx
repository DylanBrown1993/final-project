import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetchRating();
  }, []);

  const fetchRating = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/ratings')
      setRating(response.data.rating);
    } catch (error) {
      console.error ('Error fetching rating:', error)
    }
  };

  const changeRating = async (newRating) => {
    try {
      await axios.post('http://localhost:3001/api/ratings', { rating: newRating });
      setRating(newRating);
    } catch (error) {
      console.error ('Error changing rating:', error)
    }
  };

  const handleRating = (newRating) => {
    if (newRating !== rating) {
      changeRating(newRating);
    }
  };

  const handleHover = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i}
          className={`star ${i <= (hoverRating || rating) ? 'active' : ''}`}
          onMouseLeave={handleHover}
          onClick={() => handleRating(i)}
        >
          {i <= (hoverRating || rating) ? '🌟' : '⭐'}        </span>
      );
    }
    return stars;
  }

  return (
    <div>
      <div className="rating">{renderStars()}</div>
      <p>{rating} out of 5 stars </p>
    </div>
  );
};

export default Rating;