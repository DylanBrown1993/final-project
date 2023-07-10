import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton = () => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetchLikesCount();
  }, []);

  const fetchLikesCount = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/likes')
      setLikes(response.data.likes);
    } catch (error) {
      console.error ('Error fetching likes count:', error)
    }
  };

  const incrementLikes = async () => {
    try {
      const updatedCount = likes + 1;
      await axios.post('http://localhost:3001/api/likes', { count: updatedCount });
      setLikes(updatedCount);
    } catch (error) {
      console.error ('Error incrementing likes count:', error)
    }
  };

  const handleLike = () => {
    incrementLikes();
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
      <p>{likes} {likes === 1 ? 'person likes' : 'people like'} this</p>
    </div>
  );
};

export default LikeButton;