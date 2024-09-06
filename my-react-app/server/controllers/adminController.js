// const userHelper = require("../helpers/userHelper");
// const { validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");

// module.exports = {
//   adminLogin: async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//       const admin = await userHelper.findUserByEmail(email);

//       if (!admin) {
//         return res.status(401).json({ message: "Invalid credentials" });
//       }

//       const isMatch = await admin.matchPassword(password);
//       if (!isMatch) {
//         return res.status(401).json({ message: "Invalid credentials" });
//       }

//       const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

//       res.cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "Strict",
//         maxAge: 60 * 60 * 1000,
//       });

//       res.status(200).json({ message: "Admin login successful", token });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },
// };




const adminHelper = require("../helpers/adminHelper");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

module.exports = {
  adminLogin: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log("Login attempt for email:", email); // Add this line

    try {
      const admin = await adminHelper.findUserByEmail(email);
      
      console.log("Admin found:", admin); // Add this line
      
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await admin.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: admin._id, email: admin.email, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000,
      });

      res.status(200).json({ message: "Admin login successful", token });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getUsers:async(req, res)=>{
    try{
      const users = await adminHelper.getAllUsers();
      res.status(200).json({users});
    }
    catch(error){
      console.error('Get users error:', error);
      res.status(500).json({message: 'Server error during get users'});
    }
  },

  updateUser: async(req, res)=>{
    try{
      const {id} = req.params;
      const {username, email, phone}= req.body;
      const updatedUser = await adminHelper.updateUser(id, {username, email, phone});
      res.status(200).json({updatedUser});
    }catch(err){
      console.log("error updating the user:", err)
      res.status(500).json({messag:"server error occured while updating the user"})
    }
    },

    deleteUser: async(req, res)=>{
      try{
        const {id} = req.params;
        await adminHelper.deleteUser(id);
        res.status(200).json({message: "User deleted successfully"})
      }catch(err){
        console.log("error deleting the user:", err)
        res.status(500).json({message: "server error occured while deleting the user"})
      }
    },
};