import mongoose from "mongoose";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';



dotenv.config();

const url = process.env.DB_URL

export const connectdatabase = async() =>{
    try {
        await mongoose.connect(url,{
           useNewUrlParser: true,
           useUnifiedTopology: true
        })
        console.log("Mongodb connected ");
    } catch (err) {
        console.log("Error while connecting to db");
        console.log(err);
    }
}

export const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

