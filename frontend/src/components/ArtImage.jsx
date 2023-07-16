import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArtLikes from './ArtLikes';


const Art = (props) => {
  const [art, setArt] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getArt = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/art/${id}`);
        console.log("res:", res,id);
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
        <div className="art-info">
          <h1 className="art-title">{art.title}</h1>
          <p className="art-username">{art.username}</p>
          <p className="art-time">{formatDate(art.time_stamp)}</p>
          <div className="art-background">
            <img src={art.image}/>
          </div>
          <ArtLikes artId={art.id} user={props.user} setUser={props.setUser}/>
        </div>
      </div>
    </div>
  );
};
export default Art;