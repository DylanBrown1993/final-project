import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/MainArticles.css';

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
    <div className="main-article-route">
      <div className="main-article-container">
        <h1 className="main-article-title">Articles</h1>
        <div className="main-article-content">
          <div className="article-grid">
            {articles.map(article => (
              <div key={article.id} className="article-item">
              <Link to={`/article/${article.id}`}>
                <div 
                style={{
                  backgroundImage: `url(${article.header_image})`,
                }}
                className="main-article-background"
                >
                  <div className="blur-overlay" />
                  <h2 className="article-title">{article.title}</h2>
                  <p>{article.description}</p>
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
export default MainArticle;