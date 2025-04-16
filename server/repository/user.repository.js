import mongoose from "mongoose";
import { userSchema } from "../model/user.schema.js";

const usermodel = mongoose.model("User", userSchema);

export default class Userrepository {
  async signUp(user) {
    try {
      const newUser = new usermodel(user);
      await newUser.save();
      return newUser; 
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with the database");
    }
  }

  async login(Email, password) {
    try {
      return await usermodel.findOne({ Email, password });
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with the database");
    }
  }

  async getUser() {
    try {
      const users = await usermodel.find().select("_id name Email Mobilenumber");
      return users;
    } catch (err) {
      console.log("Error fetching users:", err);
      throw new Error("Database query failed");
    }
  }
  async getUserById(userId) {
    try {

      const user = await usermodel.findById(new mongoose.Types.ObjectId(userId));
      return user;
    } catch (err) {
      console.error("Error finding user:", err);
      throw new Error("Database query failed");
    }
  }
  async getLastLoggedInUser() {
    return await usermodel.findOne().sort({ lastLoginAt: -1 }).limit(1); 
  }
  async updateLastLogin(userId) {
    try {
        const result = await usermodel.updateOne( 
            { _id: userId }, 
            { $set: { lastLoginAt: new Date() } }
        );

        console.log("Last login timestamp updated:", result);
        return result;
    } catch (error) {
        console.error("Error updating last login:", error);
        throw new Error("Failed to update last login timestamp");
    }
}


  
  
  
  

}
