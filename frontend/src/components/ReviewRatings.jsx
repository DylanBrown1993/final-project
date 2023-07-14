import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rating = ({reviewId}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [prevRating, setPrevRating] = useState(0);


  const fetchRating = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/ratings?page=${reviewId}`)
      setRating(response.data.rating);
    } catch (error) {
      console.error ('Error fetching rating:', error)
    }
  };

  useEffect(() => {
    fetchRating();
  }, [reviewId]);
  
  const changeRating = async (newRating) => {
    try {
      await axios.post(`http://localhost:3001/api/ratings?page=${reviewId}`, { rating: newRating });
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

  const handleMouseLeave = () => {
    setHoverRating(0);
    setPrevRating(rating);
  };

  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i}
          className={`star ${i <= (hoverRating || rating) ? 'active' : ''}`}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave = {handleMouseLeave}
          onClick={() => handleRating(i)}
        >
          {i <= (hoverRating || rating) ? '🌟' : '⭐'}        
        </span>
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