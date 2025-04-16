import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:5000", 
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchBlogs = () => API.get("/blogsite/blogs");
export const createBlog = (blog) => API.post("/blogsite/blogs", blog);
export const signUp = (user) => API.post("/blogsite/user/signup", user);
export const login = (user) => API.post("/blogsite/user/login", user);
export const Adminlogin = (admin) => API.post("/blogsite/admin/adminlogin", admin);

export default API;
