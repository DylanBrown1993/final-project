import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleLikes from "./ArticleLikes";
import useDateFormatter from '../hooks/useDateFormatter';

const Article = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { formatDate } = useDateFormatter();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/article/${id}`);
        setArticle(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    
    getArticle();
  }, [id]);

  // Error for if there no article at the URL
  if (!article) {
    return <div>Not found</div>;
  }

  return (
    <div className="id-article-route">
      <div className="id-article-container">
        <div className="id-article-image-container">
          <img
            src={article.header_image}
            alt=""
            className="id-article-image"
          />
          <div className="id-article-info-overlay">
            <h1 className="id-article-title">{article.title}</h1>
            <p className="id-article-username">{article.username}</p>
            <p className="id-article-description">{article.description}</p>
          </div>
        </div>
        <div className="id-article-body-container">
          <div className="id-article-body">{article.body}</div>
          <p>{formatDate(article.time_stamp)}</p>
        </div>
        <div className="id-article-likes-container">
          <ArticleLikes articleId={id} />
        </div>
      </div>
    </div>
  );
};

export default Article;
