const express = require("express");
const cors = require("cors");
const connectDB = require("./config/databaseConfig");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});
