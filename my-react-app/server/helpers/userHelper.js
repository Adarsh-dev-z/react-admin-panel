const User = require("../models/User");

module.exports = {

    findUserByEmail: async (email) => {
        const user = await User.findOne({ email });
        return user;
    },

    createUser: async (data) => {
        const newUser = new User(data);
        await newUser.save();
        return newUser;
    }
}