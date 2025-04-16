import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "../api";
import { FaRegHeart,FaHeart  } from "react-icons/fa";
export default function FavBlog() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const handleFavorite = async (postId) => {
    try {
      // Call the API endpoint to update the favorite status
      const response = await fetch(`http://localhost:5000/blogsite/blogs/${postId}/favorite`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to update favorite status");
      }
  
      const updatedPost = await response.json();
  
      // Update the state with the updated favorite status
      const updatedPosts = posts.map(post =>
        post._id === postId ? { ...post, fav: updatedPost.fav } : post
      );
      setPosts(updatedPosts);
    } catch (err) {
      console.error("Failed to update favorite status:", err);
    }
  };
  

  // Fetching blogs directly within FavBlog component
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const { data } = await fetchBlogs();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    getBlogs();
  }, []);

  // Filter favorite posts directly here
  const favoritePosts = posts.filter(post => post.fav);

  return (
    <div className="fav-blog-container">
      <h2>Favorite Blogs</h2>
      {favoritePosts.length > 0 ? (
        favoritePosts.map(post => (
          <div key={post._id} className="blog-card">
            <img src={`http://localhost:5000/${post.image}`} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.desc}</p>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <div onClick={() => handleFavorite(post._id)}>
                {post.fav ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
              </div>
            <button onClick={() => navigate(`/view/${post._id}`)}>Read More</button>
          </div>
        ))
      ) : (
        <p>No favorite blogs found.</p>
      )}
    </div>
  );
}
