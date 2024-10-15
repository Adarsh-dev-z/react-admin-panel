import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    inStock: boolean
}

interface ProductState {
    products: Product[]
    product?: Product | null
    loading: boolean
    error?: string | null
}

const initialState: ProductState = {
    products: [],
    product: null,
    loading: false,
    error: null
}

export const addProduct = createAsyncThunk<Product, Omit<Product, "_id">>(
    "products/addProduct", async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/admin/add-product", productData, { withCredentials: true });
            return response.data
        }
        catch (err:any) {
            return rejectWithValue(err.response.data)
        }
    })

export const fetchProducts = createAsyncThunk<Product[]>(
    "products/fetchProducts",
     async(_, {rejectWithValue}) =>{
        try{
            const response = await axios.get("http://localhost:3000/api/admin/products", { withCredentials: true });
            return response.data
        }
        catch(err: any){
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchProductById = createAsyncThunk<Product, string>(
    "products/fetchProductsById"
)