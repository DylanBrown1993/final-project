import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "../styles/SubmitArt.css";
import axios from "axios";

const SubmitArt = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/submitart", {
        title,
        image,
      });
      navigate("/art");
    } catch (error) {
      console.error("Error submitting art", error);
    }
  };

  return (
    <div>
      <h1>Submit An Art Piece</h1>
      {!props.user ? (
        <form method="POST" action="/submitart" onSubmit={handleSubmit}>
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
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Please log in to submit an art piece</p>
      )}
    </div>
  );
};

export default SubmitArt;
