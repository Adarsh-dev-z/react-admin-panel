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
            const users = await User.find({isDeleted:false});
            return users;
        } catch (err) {
            throw new Error("Error fetching users: " + err.message);
        }
    },

    updateUser: async (id, updateData) => {
        try {
            return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        } catch (err) {
            console.log("Error updating user:", err.message);
            throw new Error("Error updating user: " + err.message);
        }
    },

    deleteUser: async (id) => {
        try {
            return await User.findByIdAndUpdate(id,{isDeleted: true});
        } catch (err) {
            throw new Error("Error deleting user: " + err.message);
        }
    },

    addUser: async (data) => {
        try {
            const user = await User.create(data);
            return user;
        } catch (err) {
            throw new Error("Error adding user: " + err.message);
        }
    },

    checkExistance: async (email) => {
        try {
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return false;
            }
            return true;
        } catch (err) {
            console.error("Error checking user existence: ", err.message);
            throw new Error("Error checking user existence");
        }
    },

    addNewProduct: async(data)=>{
        try{
            const newProduct = await Product.create(data);
            return newProduct
        }
        catch(err){
            console.error("error happaned while adding product", err);
            throw new Error("error occured while adding new product")
        }
    },


    bulkUsersDelete: async (data) => {
        try {
            const deleteSelectedUsers = await User.updateMany(
                { _id: { $in: data }, isDeleted: false },  
                { $set: { isDeleted: true } }             
            );
    
            if (deleteSelectedUsers.nModified === 0) {
                throw new Error("No users were updated. Either they do not exist or are already deleted.");
            }
    
            return {
                success: true,
                message: `${deleteSelectedUsers.nModified} users marked as deleted.`,  
                data: deleteSelectedUsers
            };
        } catch (err) {
            console.error("Error occurred while deleting users", err);
            throw new Error("Error occurred while deleting selected users.");
        }
    },

    getUsersWithPagination: async (skip, limit) => {
        return await User.find({isDeleted:false}).skip(skip).limit(limit); 
    }
    
    
};
