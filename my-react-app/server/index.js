const express = require("express");
const cors = require("cors");
const connectDB = require("./config/databaseConfig");

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

app.use(cors(corsOptions));
app.use(express.json());

const userRoutes = require("./routes/userRoutes");

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});