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
      <h1>Submit An Article</h1>
      {!props.user ? (
        <form method="POST" action="/submitarticle" onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Image:
            <input
              type="url"
              value={header_image}
              onChange={(e) => setHeader_Image(e.target.value)}
            />
          </label>
          <label>
            Body:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Please log in to submit an article</p>
      )}
    </div>
  );
};

export default SubmitArticle;
