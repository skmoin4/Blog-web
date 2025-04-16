  import BlogRepository from "../repository/blog.repository.js";
  import { transporter } from "../config/mongoose.js";
import Userrepository from "../repository/user.repository.js";
  export default class BlogController {
    constructor() {
      this.blogRepository = new BlogRepository();
        this.userrepository = new Userrepository(); 
    
    }


    async createBlog(req, res) {
      const { title, keyword, desc, content } = req.body;
      const image = req.file ? req.file.path : null;



      if (!title || !keyword || !desc || !content) {
        return res.status(400).json({ error: "All fields are required" });
      }

    
          
      try {
       
        const user = await this.userrepository.getLastLoggedInUser();
    
        if (!user || !user._id) {
          return res.status(401).json({ error: "No logged-in user found" });
        }
    
       
        await this.userrepository.updateLastLogin(user._id);
    

        const newBlog = await this.blogRepository.createBlog({
          title,
          keyword,
          desc,
          content,
          image,
          username:user.name,
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to:user.Email,
          subject: "Your Blog Post Has Been Published!",
          html: `<p>Dear User,</p>
                <p>Your blog post titled "<strong>${title}</strong>" has been successfully published.</p>
                <p>Thank you for sharing your thoughts with us!</p>
                <p>Best Regards,<br>Blog Team</p>`,
        };
        

        

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info);

   

        return res.status(201).json({ 
          success: true, 
          message: "Blog created successfully", 
          blog: newBlog 
        });
      } 
      
      catch (err) {
        console.error(err);
 
        return res.status(500).json({ error: "Error saving blog post" });
      }

    }


    async getBlogs(req, res) {
      try {
        const blogs = await this.blogRepository.getBlogs();
        return res.status(200).json(blogs);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error fetching blogs" });
      }
    }

    async getBlogById(req,res){

      const {id} = req.params

      try {
      const blog = await this.blogRepository.getBlogById(id)
      return res.status(200).json(blog);
      } catch (error) {
        console.log(error)
      }
      
        }
        async updateFavorite(req, res) {
          const { id } = req.params;
        
          if (!id) {
            return res.status(400).json({ error: "Blog ID is required" });
          }
        
          try {
            const updatedBlog = await this.blogRepository.updateFavorite(id);
            return res.status(200).json(updatedBlog);
          } catch (err) {
            console.error("Error in updating favorite:", err);
            return res.status(500).json({ error: "Error updating favorite status" });
          }
        }
        
        
        
  }
