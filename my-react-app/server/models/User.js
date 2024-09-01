const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
}, { timestamps: true, minimize: false });

module.exports = model('User', userSchema);
