const express = require("express");
const cors = require("cors");
const connectDB = require("./config/databaseConfig");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 3000; 

const app = express();

connectDB();

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Your frontend URL
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    next();
});

app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});