import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ForumComments from './ForumComments';

const ForumItemBody = (props) => {

const [forumItem, setForumItem] = useState({});
const { id } = useParams();
console.log("props", props.user);

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
      <p> Posted by: {forumItem.username} </p>
      <p> Posted by: {new Date (forumItem.time_stamp).toLocaleString()} </p>
      <p 
      className="forum-item-body" style={{marginTop:"50px"}}>{forumItem.body} 
      </p>
      &nbsp;
      <ForumComments id={id} user={props.user} setUser={props.setUser}/>

    <button>
      <a href="/forum">Back to Forum</a>
    </button>
    </div>;
};

export default ForumItemBody;