import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const ForumComments = (props) => {
  
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
  
    return <div>

      <h2>Comments</h2>
        <div className="forum-item-comments">
          <input
          placeholder="What are your thoughts?" id="add-comment" name="add-comment" size={75}
          />
          <button className="comment-submit-btn">Comment</button>
        </div>
        <div className="forum-item-comments">
        {comments.map((comment) => (
          <p className="comment">{comment}</p>
        ))}
        </div>
  
      </div>;

}

export default ForumComments;