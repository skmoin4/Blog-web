import mongoose from "mongoose";

export const AdminSchema = new mongoose.Schema({

    Email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

});
