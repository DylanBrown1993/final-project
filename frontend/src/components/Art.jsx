import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Art = () => {
  const [art, setArt] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/art`);
        setArt(response.data);
      } catch (error) {
        console.error('Error fetching art', error);
      }
    };

    fetchArt();
  }, [id]);

  if (!art) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{art.title}</h1>
      <img src={art.image} alt={art.title} />
      <p>{art.time_stamp}</p>
      <p>{art.user_id}</p>
    </div>
  );
};

export default Art;
