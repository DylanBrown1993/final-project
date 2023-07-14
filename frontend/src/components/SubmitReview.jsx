import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../styles/SubmitReview.css";
import axios from "axios";

const SubmitReview = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/submitreview", {
        title,
        description,
        body,
      });
      navigate("/reviews");
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };

  return (
    <div>
      <h1>Submit A Review</h1>
      {!props.user ? (
        <form method="POST" action="/submitreview" onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
        <p>Please log in to submit a review</p>
      )}
    </div>
  );
};

export default SubmitReview;
