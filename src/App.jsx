import './App.css'
import React, { useState, useEffect } from 'react';
import PostList from './components/PostList/PostList';
import PostDetail from './components/PostDetail/PostDetail';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [error, setError] = useState(null);

  // Load posts and users when the app mounts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setIsLoadingPosts(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoadingPosts(false);
      });

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setIsLoadingUsers(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoadingUsers(false);
      });
  }, []);

  // Load comments when a post is selected
  useEffect(() => {
    if (selectedPostId) {
      setIsLoadingComments(true);
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${selectedPostId}`)
        .then(response => response.json())
        .then(data => {
          setComments(data);
          setIsLoadingComments(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoadingComments(false);
        });
    }
  }, [selectedPostId]);

  // Handle loading and error states
  if (isLoadingPosts || isLoadingUsers) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app-container">
      {selectedPostId === null ? (
        <PostList posts={posts} onSelectPost={setSelectedPostId} />
      ) : (
        <PostDetail
          post={posts.find(post => post.id === selectedPostId)}
          user={users.find(user => user.id === posts.find(post => post.id === selectedPostId)?.userId)}
          comments={comments}
          isLoadingComments={isLoadingComments}
          onBack={() => setSelectedPostId(null)}
        />
      )}
    </div>
  );
};

export default App;