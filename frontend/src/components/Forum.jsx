import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { get } from 'request';

const Forum = () => {
  const [forums, setForum] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    
    getForum();
  }, []);

  const getForum = async () => {
    try {
      const res = await axios.get("http://localhost:3001/forums");
      console.log("hello", res.data);
      setForum(res.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };


  const submitData = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3001/forums", {
      title,
      body
    })

    getForum();
  };


  return (
    <div>
      <h1>Forum</h1>
      <form onSubmit={submitData}>
        <label for="title">Title</label>
        <input type="text" id="title" name="title" onChange={(e)=>setTitle(e.target.value)}/>
        <label for="content">Body</label>
        <textarea id="content" name="body" rows="4" cols="50" onInput={(e)=>setBody(e.target.value)}></textarea>
        <input type="submit" value="Submit"/>

      </form>
      <div className="forum-list">
        {forums.map(forum => (
          <div key={forum.id} className="forum-list-item">
            <Link to={`/forum/${forum.id}`}>
              <h2>{forum.title}</h2>
            </Link>
            <p>{forum.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;