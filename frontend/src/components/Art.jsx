import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const MainArt = () => {
  const [art, setArt] = useState([]);

  useEffect(() => {
    const getArt = async () => {
      try {
        const res = await axios.get("http://localhost:3001/art");
        setArt(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    getArt();
  }, []);

  return (
    <div className="main-art-route">
      <div className="main-art-container">
        <h1 className="main-art-title">Art</h1>
        <div className="main-art-content">
          <div className="art-grid">
            {art.map(art => (
              <div key={art.id} className="article-item">
                <Link to={`/art/${art.id}`}>
                  <div style={{backgroundImage: `url(${art.image})`}} className="main-art-background">
                    <h2>{art.title}</h2>
                    <p></p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainArt;