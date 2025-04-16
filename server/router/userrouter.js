import express from 'express';
import UserController from '../controller/usercontroller.js';

const userrouter = express.Router();

const userController  = new UserController();

userrouter.post('/signup',(req,res)=>{
    userController.signUp(req,res)
})

userrouter.post('/login',(req,res)=>{
    userController.login(req,res)
})

userrouter.get('/',(req,res)=>{
    userController.getUser(req,res)
})



export default userrouter;
