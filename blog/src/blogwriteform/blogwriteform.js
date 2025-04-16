import React, { useState } from "react";
import axios from "axios"; // Assuming you're using axios to make API calls
import "./blogwriteform.scss";
import { useNavigate } from "react-router-dom";

export default function Blogwriteform() {
  const [formData, setFormData] = useState({
    title: "",
    keyword: "",
    desc: "",
    content: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.keyword ||
      !formData.desc ||
      !formData.content
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("keyword", formData.keyword);
    formDataToSend.append("desc", formData.desc);
    formDataToSend.append("content", formData.content);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/blogsite/blogs",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Blog added successfully!");
      setFormData({
        title: "",
        keyword: "",
        desc: "",
        content: "",
        image: null,
      }); 
      navigate("/");
    } catch (error) {
      console.error("Error submitting the blog:", error);
      alert("An error occurred while submitting the blog.");
    }
  };

  return (
    <div className="formcontainer">
      <div className="blogwriteform">
        <h1>Write a Blog Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
            />
          </div>
          <div className="form-group">
            <label>Keyword</label>
            <input
              type="text"
              name="keyword"
              value={formData.keyword}
              onChange={handleChange}
              placeholder="Enter keywords"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Enter short description"
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter blog content"
            />
          </div>
          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" name="image" onChange={handleFileChange} />
          </div>
          <button type="submit">Add Blog</button>
        </form>
      </div>
    </div>
  );
}
