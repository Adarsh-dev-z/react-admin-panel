const userHelper = require("../helpers/userHelper");
const User = require("../models/User");
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();


module.exports = {
    getLogin: (req, res) => {
        res.render("userLogin");
    },

    userRegister: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        try {
            const { username, email, phone, password } = req.body;
            console.log(req.body)
            const existingUser = await userHelper.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists, Kindly login" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const userData = {
                username,
                email,
                phone,
                password: hashedPassword,
            };

            const newUser = await userHelper.createUser(userData);

            const token = jwt.sign({id: newUser._id, email:newUser.email}, process.env.JWT_SECRET, {expiresIn: '1h'});

            res.cookie('token', token, {
                httpOnly: true,
                secure:process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 60*60*1000
            })

            res.status(201).json({ message: "User registered successfully", token });
        } catch (err) {
            console.log('registration error', err);
            res.status(500).json({ message: "Server error" });
        }
    },

    userLogin: async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        try {
            const { email, password } = req.body;
            const user = await userHelper.findUserByEmail(email);
            if (!user) {
                return res.status(400).json({ message: "User does not exist" });
            }
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
    
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 60 * 60 * 1000, // 1 hour
            });

            res.status(200).json({message:'Login successful', token});
        }
        catch(err){
            console.log('login error', err)
            res.status(500).json({message:'server error'})
        }
    },
    userLogout: async(req, res) => {
        res.clearCookie('token', {
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'Strict'
        });
        res.status(200).json({message: 'Logout successful'});
    }
};
