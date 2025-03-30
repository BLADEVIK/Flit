import React from 'react';
import './PostList.css';

const PostList = ({ posts, onSelectPost }) => (
  <div className="post-list">
    <h1>Posts</h1>
    <div className="posts-container">
      {posts.map(post => (
        <div
          key={post.id}
          onClick={() => onSelectPost(post.id)}
          className="post-card"
        >
          <h2>{post.title}</h2>
          <p>{post.body.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  </div>
);

export default PostList; 