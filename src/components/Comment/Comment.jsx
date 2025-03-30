import React from 'react';
import './Comment.css';

const Comment = ({ comment }) => (
  <div className="comment">
    <h4>{comment.name}</h4>
    <p className="comment-body">{comment.body}</p>
    <p className="comment-author">By: {comment.email}</p>
  </div>
);

export default Comment; 