import React, { useEffect, useState } from "react";
import axios from "../api"; 
import { useNavigate } from "react-router-dom";
import './heropage.scss';
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFavorite = async (postId) => {
    try {
      const updatedPosts = posts.map(post =>
        post._id === postId ? { ...post, fav: !post.fav } : post
      );
      setPosts(updatedPosts);

      const response = await axios.patch(`/blogsite/blogs/${postId}/favorite`);

      if (response.status !== 200) {
        throw new Error("Failed to update favorite status");
      }

      const updatedPost = response.data;

      const finalUpdatedPosts = posts.map(post =>
        post._id === postId ? { ...post, fav: updatedPost.fav } : post
      );
      setPosts(finalUpdatedPosts);
    } catch (err) {
      console.error("Failed to update favorite status:", err);
      setError("Failed to update favorite status. Please try again.");
      
      const revertedPosts = posts.map(post =>
        post._id === postId ? { ...post, fav: !post.fav } : post
      );
      setPosts(revertedPosts);
    }
  };

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get("/blogsite/blogs");
        setPosts(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs. Please try again later.");
      }
    };
    getBlogs();
  }, []);

  return (
    <div className="blog-container">
      <h1>Our Blog</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="blog-posts">
        {posts.map((post) => (
          <div key={post._id} className="blog-card">
            <img src={`http://localhost:5000/${post.image}`} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.desc}</p>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <p>Post by: user email</p>

            <div onClick={() => handleFavorite(post._id)}>
              {post.fav ? (
                <FaHeart style={{ color: "red" }} />
              ) : (
                <FaRegHeart />
              )}
            </div>

            <button onClick={() => navigate(`/view/${post._id}`)}>
              Read More
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/write")}>Add your Blog</button>
    </div>
  );
}