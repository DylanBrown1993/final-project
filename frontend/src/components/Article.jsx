import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleLikes from "./ArticleLikes.jsx";
import "../styles/Article.css";

const Article = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/article/${id}`);
        setArticle(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    getArticle();
    setLoading(false);
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

 return (
    (loading) ? (
      <div>Article Loading...</div>
    ) : (
      (article) ? (
        <div className="article-route">
        <div className="article-container">
          <h1>Article</h1>
          <div className="article-info">
            <p>{formatDate(article.time_stamp)}</p>
            <div
              style={{ backgroundImage: `url(${article.header_image})` }}
              className="article-background"
              >
              <h1>{article.title}</h1>
              <p>{article.username}</p>
              <p>{article.description}</p>
            </div>
            <p>{article.body}</p>
            <ArticleLikes articleId={id} />
          </div>
        </div>
      </div>
      )
      :
      (<div>
        Not found
      </div>)
    )
  )
};
export default Article;
