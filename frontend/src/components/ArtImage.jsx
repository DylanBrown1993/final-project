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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!art) {
    return <div> Art Not Found </div>;
  }

  return (
    <div className="art-route">
      <div className="art-container">
        <h1>Art</h1>
        <div className="art-info">
          <p>{formatDate(art.time_stamp)}</p>
          <h1>{art.title}</h1>
          <p>{art.username}</p>
          <div className="art-background">
            <img src={art.image}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Art;