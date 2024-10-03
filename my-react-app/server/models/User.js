const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: Number, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true, default: "user" },
        isDeleted: { type: Boolean, required: true, default: false}
    },
    { timestamps: true, minimize: false }
);

module.exports = model("User", userSchema);
