import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Forum = () => {
  const [forums, setForum] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

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
    }).then(() => {
      setTitle("");
      setBody("");
      getForum();
    })

  };

  console.log("forums here", forums)


  //forum topics from most recent to least recent

  return (
    <div>
      <h1 className="forum-header">Forum</h1>
      <form onSubmit={submitData}>
        <label for="title">Title</label>
        <input value={title} type="text" id="title" name="title" onChange={(e)=>setTitle(e.target.value)}/>
        <label for="content">Body</label>
        <textarea id="content" value={body} name="body" rows="4" cols="50" onChange={(e)=>setBody(e.target.value)}></textarea>
        <input type="submit" value="Submit"/>

      </form>
      <div className="forum-list">
        {forums.map(forum => (
          <div key={forum.id} className="forum-list-item">
            <Link to={`/forum/${forum.id}`}>
              <h2>{forum.title}</h2>
            </Link>
          <div className="forum-user>">
            <a>Posted by: {forum.username}</a>
            <br></br>
            <a>Posted on: {forum.time_stamp}</a>
          </div>
            {/* <p>{forum.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;