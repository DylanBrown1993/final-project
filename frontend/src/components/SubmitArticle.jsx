import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../styles/SubmitArticle.css";
import axios from "axios";

const SubmitArticle = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [header_image, setHeader_Image] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/submitarticle", {
        title,
        header_image,
        description,
        body,
      });
      navigate("/articles");
    } catch (error) {
      console.error("Error submitting article", error);
    }
  };

  return (
    <div>
      <h1 className="submit-article-title">Submit An Article</h1>
      {!props.user ? (
        <form method="POST" action="/submitarticle" onSubmit={handleSubmit}>
          <label>
            Title:
          </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          <label>
            Image URL:
          </label>
            <input
              type="url"
              value={header_image}
              onChange={(e) => setHeader_Image(e.target.value)}
            />
          <label>
            Body:
          </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          <label>
            Description:
          </label>
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Please log in to submit an article</p>
      )}
    </div>
  );
};

export default SubmitArticle;
