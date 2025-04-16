import mongoose from "mongoose";
import { blogpostSchema } from "../model/blog.scema.js";

const blogModel = mongoose.model("Blog", blogpostSchema);

export default class BlogRepository {
  async createBlog(blog) {
    try {
      const newBlog = new blogModel(blog);
      await newBlog.save();
      return newBlog;
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with the database");
    }
  }

  async getBlogs() {
    try {
      return await blogModel.find();
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with the database");
    }
  }

  async getBlogById(id){

try {
  const blog = await blogModel.findById(id); 
} catch (error) {
  console.log(error)
}

  }
  // Inside BlogRepository.js
  async updateFavorite(id) {
    try {
      const blog = await blogModel.findById(id);  // Correct model
      if (!blog) {
        throw new Error("Blog not found");
      }
  
      // Toggle the favorite status
      blog.fav = !blog.fav;
      const updatedBlog = await blog.save();
  
      return updatedBlog;
    } catch (error) {
      console.error("Error updating favorite status:", error.message);
      throw new Error("Error updating favorite status");
    }
  }

}
