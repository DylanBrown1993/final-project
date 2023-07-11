import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Art = () => {
  const [art, setArt] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getArt = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/art/${id}`);
        setArt(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    getArt();
  }, [id]);

  if (!art) {
    return <div> Art Not Found </div>;
  }

  return (
    <div className="art-route">
      <div className="art-container">
        <h1>Art</h1>
        <div className="art-info">
          <p>{art.time_stamp}</p>
          <div style={{backgroundImage: `url(${art.image})`}} className="art-background">
            <h1>{art.title}</h1>
            {/* change user_id? */}
            <p>{art.user_id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Art;