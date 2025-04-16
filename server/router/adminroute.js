import express from 'express';
import AdminController from '../controller/admincontroler.js';

const adminrouter = express.Router();
const admincontroler = new AdminController();


adminrouter.post('/',
    admincontroler.createNewAdmin
)

adminrouter.post('/adminlogin',(req,res)=>{
    admincontroler.Adminlogin(req,res)
})


export default adminrouter;
