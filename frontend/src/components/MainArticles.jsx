import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/MainArticles.css';
import '../styles/Article.css';

const MainArticle = () => {
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

  return (
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
  );
};
export default MainArticle;