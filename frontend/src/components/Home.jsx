import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/Games.css';
import '../styles/Fonts.css';
import '../styles/Home.css';
import '../styles/Art.css';
import '../styles/Article.css';
import '../styles/Navigation.css';
import RunGameImage from '../../../src/images/RunGame.png';
import ColorJumpImage from '../../../src/images/ColorJump.png';
import '../styles/MainArticles.css';
import '../styles/MainReviews.css';


const Home = () => {
  const [art, setArt] = useState([]);
  // const { id } = useParams();

  useEffect(() => {
    const getArt = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/art`);
        setArt(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    getArt();
  }, []);

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axios.get("http://localhost:3001/articles");
        setArticles(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    getArticles();
  }, []);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get("http://localhost:3001/reviews");
        setReviews(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    getReviews();
  }, []);

  return (
    <div className='home-container'>
      <div className='home-text-section'>
        <h1 className='primary-heading'>
          Welcome to Ribbit
        </h1>
        <body className='home-text'>
          Home of the best gaming reviews and articles.
        </body>
      </div>
      <div className="home-articles-container">
        <h2>Articles</h2>
        <div className="home-article-grid">
          {articles.map((article, index) => (
            <div key={article.id} className={`home-article-item ${index === 0 ? 'home-full-width' : 'home-grid-item'}`}>
              <Link to={`/article/${article.id}`} className='article-link'>
                <div className={`home-article-content ${index === 0 ? 'home-article-first' : ''}`}>
                  <div className="article-image-container">
                    <img src={article.header_image} alt="" className="article-image" />
                  </div>
                  <h2 className="article-title">{article.title}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="reviews-container">
        <h2>Reviews</h2>
        <div className="home-review-grid">
          {reviews.map((review, index) => (
            <div key={review.id} className={`home-review-item ${index === 0 ? 'home-review-full-width' : 'home-review-grid-item'}`}>
              <Link to={`/review/${review.id}`}  className='review link'>
                <div className={`home-review-content ${index === 0 ? 'home-review-first' : ''}`}>
                  <h2 className="review-title">{review.title}</h2>
                  <p>{review.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="arts-container">
  <h2>Art</h2>
  <div className="art-grid">
    {art.map((art) => (
      <div key={art.id} className="art-item">
        <Link to={`/art/${art.id}`}>
          <div className="main-art-background">
            <img src={art.image} className="art-image" alt="Art Image" />
            <div className="art-details">
              <span className="art-username">{art.username}</span>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>
      <div className="games-container">
        <h2>Games</h2>
        <div className='games-list-container'>
          <Link to="/rungame">
            <img src={RunGameImage} alt="run-game-img" />
          </Link>
          <Link to="/colorjump">
            <img src={ColorJumpImage} alt="color-jump-img" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;