import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Email: { type: String, unique: true, required: true },
  Mobilenumber: { type: Number, required: true },
  password: { type: String, required: true },
  lastLoginAt: { type: Date, default: null }
});
 