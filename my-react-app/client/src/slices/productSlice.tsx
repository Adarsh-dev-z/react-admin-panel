import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk("admin/add-product", async(productData, {rejectWithValue})=>{
    try{
        const response = await axios.post("http://localhost:3000/api/admin/add-product")
    }
})