import mongoose from "mongoose";
import { AdminSchema } from "../model/superadmin.js";

const Admin = mongoose.model("Admin", AdminSchema);

export default class AdminRepository {
  async createAdmin(email, password) {
    try {
      const newAdmin = new Admin({
        Email: email,
        password: password,
      });

      await newAdmin.save();
      return newAdmin;
    } catch (error) {
      console.error("Error creating admin:", error);
      throw error;
    }
  }

  async Adminlogin(Email, password) {
    try {
      return await Admin.findOne({ Email, password });
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with the database");
    }
  }
 
}

