import mongoose from "mongoose";

export const blogpostSchema = new mongoose.Schema({

  title: { type: String, required: true },
  keyword: String,
  desc:String,
  content: { type: String, required: true },
  image: { type: String },
  Check: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now },
  username:{ type: String, required: true },
  fav:{ type: Boolean, default: false }
})
