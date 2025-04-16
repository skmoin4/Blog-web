



import React, { useEffect, useState } from "react";
import { fetchBlogs ,} from "../api";
import { useNavigate } from "react-router-dom";



export default function AdminPanel() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();


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


  return (
    <div className="blog-container">
      <h1>blog req</h1>
      <div className="blog-posts">
        {posts.map((post) => (
          <div key={post._id} className="blog-card">
            <img src={`http://localhost:5000/${post.image}`} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.desc}</p>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <button onClick={() => navigate(`/view/${post._id}`)}>
              Read More
            </button>
            <button>accept</button>
          </div>
        ))}
      </div>
  
      
    </div>
  );
}


