import React from 'react';
import Comment from '../Comment/Comment';
import './PostDetail.css';

const PostDetail = ({ post, user, comments, isLoadingComments, onBack }) => (
  <div className="post-detail">
    <button
      onClick={onBack}
      className="back-button"
    >
      Back to Posts
    </button>
    <h1 className="post-title">{post.title}</h1>
    <p className="post-body">{post.body}</p>
    <p className="post-author">Written by: {user?.name || 'Unknown'}</p>
    <div className="comments-section">
      <h3>Comments</h3>
      {isLoadingComments ? (
        <div className="loading-comments">Loading comments...</div>
      ) : comments.length > 0 ? (
        <div className="comments-container">
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  </div>
);

export default PostDetail; 