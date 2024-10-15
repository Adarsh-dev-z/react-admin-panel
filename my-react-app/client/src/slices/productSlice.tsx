import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
    "products/fetchProductsById",
    async(id, {rejectWithValue}) =>{
        try{
            const response = await axios.get(`http://localhost:3000/api/admin/productById/${id}`, { withCredentials: true });
            return response.data
        }
        catch(err: any){
            return rejectWithValue(err.response.data)
        }
    }
)

export const updateProduct = createAsyncThunk<Product, {id: string; productData: Omit<Product, "_id">}>(
    "products/updateProduct",
    async({id, productData}, {rejectWithValue}) =>{
        try{
            const response = await axios.put(`http://localhost:3000/api/admin/updateProduct/${id}`, productData, { withCredentials: true });
            return response.data
        }
        catch(err:any){
            return rejectWithValue(err.response.data)
        }
    }
)

export const deleteProduct = createAsyncThunk<string, string>(
    "products/deleteProduct",
    async(id, {rejectWithValue})=>{
        try{
            await axios.delete(`http://localhost:3000/api/admin/updateProduct/${id}`, { withCredentials: true });
            return id;
        }
        catch(err:any){
            return rejectWithValue(err.response.data)
        }
    }
)

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
        resetProductState: (state) =>{
            state.product = null;
            state.error = null;
            state.loading = null;
        },
    },
    extraReducers: (builder) =>{
        builder
                .addCase(addProduct.pending, (state)=>{
                    state.loading=true;
                    state.error=null
                })
                .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>)=>{
                    state.loading= false;
                    state.error=null;
                    state.products.push(action.payload);
                })
                .addCase(addProduct.rejected, (state, action: PayloadAction<any>)=>{
                    state.loading=false;
                    state.error= action.payload;
                })
    }
})