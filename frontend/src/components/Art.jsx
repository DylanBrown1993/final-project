import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MainArt = (props) => {
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
        <Link to={`/submitart`}>
          <button>Submit An Art Piece</button>
        </Link>
        <div className="main-art-content">
          <button>
          </button>
          <div className="art-grid">
            {art.map(art => (
              <div key={art.id} className="art-item">
                <Link to={`/art/${art.id}`}>
                  <div className="main-art-background">
                    <img src={art.image} className="art-image" alt="Art Image" />
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