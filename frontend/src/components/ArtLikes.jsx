import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ArtLikes = ({ artId, user }) => {
  console.log("user here", user);
  const [likes, setLikes] = useState(0);

  const fetchLikesCount = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/artLikes?page=${artId}`);
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error fetching likes count:', error);
    }
  };

  useEffect(() => {
    fetchLikesCount();
  }, [artId]);

  const incrementLikes = async () => {
    try {
      const updatedCount = likes + 1;
      console.log("UPDATE ACCOUNT:", updatedCount, artId);
      await axios.post(`http://localhost:3001/api/artLikes?page=${artId}`, { count: updatedCount });
      setLikes(updatedCount);
    } catch (error) {
      console.error('Error incrementing likes count:', error);
    }
  };

  const handleLike = () => {
    incrementLikes();
  };

  return (
    <div>
      <button className="like-button" onClick={handleLike}>Like</button>
      <p className='number-likes'>{likes} {likes === 1 ? 'person likes' : 'people like'} this</p>
    </div>
  );
};

export default ArtLikes;
