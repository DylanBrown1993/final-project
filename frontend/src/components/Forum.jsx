import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Forum.css';

const Forum = (props) => {
  const [forums, setForums] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const getForums = async () => {
    try {
      const res = await axios.get('http://localhost:3001/forums');
      console.log('hello', res.data);
      setForums(res.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    getForums();
  }, []);

  const submitData = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/forums', {
        title,
        body,
      });
      setTitle('');
      setBody('');
      getForums();
    } catch (error) {
      console.error('Error submitting data', error);
    }
  };

  return (
    <div>
      <h1 className="forum-header">Forum</h1>
      {!props.user ? (
        <form onSubmit={submitData}>
          <label htmlFor="title">Title:</label>
          <input value={title} type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="content">Body:</label>
          <textarea id="content" value={body} name="body" rows="4" cols="50" onChange={(e) => setBody(e.target.value)}></textarea>
          <input type="submit" value="Submit" className="forum-submit-btn" />
        </form>
      ) : (
        <p className="forum-login">Please log in to post</p>
      )}

      <div className="forum-list">
        {forums.map((forum) => (
          <div key={forum.id} className="forum-list-item">
            <Link to={`/forum/${forum.id}`}>
              <h2>{forum.title}</h2>
            </Link>
            <div className="forum-user">
              <a>Posted by: {forum.username}</a>
              <br />
              <a>Posted on: {new Date(forum.time_stamp).toLocaleString()}</a>
            </div>
          </div>
        ))}
      </div>
      <button>
        <a href="/">Back to Home</a>
      </button>
    </div>
  );
};

export default Forum;
