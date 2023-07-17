import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Games.css';
import '../styles/Fonts.css';
import '../styles/Home.css';
import '../styles/Art.css';
import '../styles/Navigation.css';
import '../styles/MainReviews.css';
import RunGameImage from '../../../src/images/RunGame.png';
import ColorJumpImage from '../../../src/images/ColorJump.png';

const Home = () => {
  const [art, setArt] = useState([]);

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
      <div className='home-header-section'>
      </div>
      <div className='home-text'>
        Welcome to Flying Frog, the premier online destination created by gamers, 
          for gamers. Our mission is to foster a vibrant community where gamers of 
          all backgrounds can come together to celebrate their shared passion. With 
          a focus on fan art, reviews, articles, games, and an engaging forum, 
          Flying Frog provides a platform for gamers to connect, collaborate, 
          and inspire one another. We believe in the power of gaming to unite and 
          create meaningful experiences, and our goal is to provide a welcoming space 
          where everyone feels valued and included. Join us on this exciting journey 
          as we build a community that embraces the true spirit of gaming.
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
            <img src={art.image} className="art-image" alt="displays the art" />
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
            <img src={ColorJumpImage} alt="displays the game logo" />
          </Link>
        </div>
      </div>
      <footer className='company-footer'>® Flying Frog Games a divison of Ribbit Entertainment™  </footer>
    </div>
  );
};

export default Home;