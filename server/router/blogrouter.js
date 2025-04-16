
import express from "express";
import BlogController from "../controller/blogcontroller.js";
import upload from "../middlewares/multer.js"; 
const blogrouter = express.Router();
const blogController = new BlogController();


blogrouter.post("/", upload.single("image"), (req, res) => {
  blogController.createBlog(req, res);
});


blogrouter.get('/',(req,res)=>{
    blogController.getBlogs(req,res)
})

blogrouter.get('/:id',(req,res)=>{
  blogController.getBlogById(req,res)
})

blogrouter.patch('/:id/favorite', (req, res) => blogController.updateFavorite(req, res));

export default blogrouter;


