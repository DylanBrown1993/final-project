import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ForumComments from './ForumComments';

const ForumItemBody = (props) => {

const [forumItem, setForumItem] = useState({});
const { id } = useParams();

  useEffect(() => {
  
    axios.get(`http://localhost:3001/forums/${id}` )
    .then(res => {
      console.log("testing", res);
      console.log("testing2", res.data);
      setForumItem(res.data);
    })

      .catch(error => {
        console.log(error);
      })
    }, []);
  
    

  return <div>
    <h1 className="forum-item-title">{forumItem.title}</h1>
      <p 
      className="forum-item-body" style={{marginTop:"50px"}}>{forumItem.body} 
      </p>
      <ForumComments />

    {/* <h2>Comments</h2>
      <div className="forum-item-comments">
        <textarea id="add-comment" name="add-comment" rows="4" cols="50">
          Add a comment...
        </textarea>
        <button className="comment-submit-btn">Submit</button>
        <p className="comment">Comment 1</p>
        <p className="comment">Comment 2</p>
        <p className="comment">Comment 3</p>
      </div> */}

    <button>
      <a href="/forum">Back to Forum</a>
    </button>
    </div>;
};

export default ForumItemBody;