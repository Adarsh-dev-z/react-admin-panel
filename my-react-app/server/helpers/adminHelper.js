const Admin = require("../models/Admin");
const User = require("../models/User");

module.exports = {
  findUserByEmail: async (email) => {
    if (!email) {
      throw new Error("Email is required");
    }

    console.log("Searching for admin with email:", email);
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      throw new Error("Admin not found");
    }

    console.log("Admin found:", admin);
    return admin;
  },
  getAllUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      throw new Error("Error fetching users: " + err.message);
    }
  },

  updateUser: async (id, updateData) => {
    try{
      return await User.findByIdAndUpdate(id, updateData, {new: true, runValidators: true});
    }catch(err){
      console.log("Error updating user:", err.message);
      throw new Error("Error updating user: " + err.message);
    }
  },

  deleteUser:async(id)=>{
    try{
      return await User.findByIdAndDelete(id);
    }catch(err){
      throw new Error("Error deleting user: " + err.message);
    }
  }
};
