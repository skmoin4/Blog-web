import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api";
import { fetchBlogs ,} from "../api";
import './viewblog.scss';

export default function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`/blogsite/blogs/${id}`);
        setBlog(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load blog.");
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>; // You can enhance this with a spinner
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!blog) {
    return <div className="error">Blog not found!</div>;
  }

  return (
    <div className="viewblog-container">
      <img src={`http://localhost:5000/${blog.image}`} alt={blog.title} />
      <h1>{blog.title}</h1>
      <h2>{blog.keyword}</h2>
      <p>{blog.content}</p>
   
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}
