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
            state.loading = false;
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

                .addCase(fetchProducts.pending, (state)=>{
                    state.loading=true;
                    state.error=null
                })
                .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                    state.loading = false;
                    state.products = action.payload;
                  })
                  .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload;
                  })

                  .addCase(fetchProductById.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                    state.loading = false;
                    state.product = action.payload;
                  })
                  .addCase(fetchProductById.rejected, (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload;
                  })
                  
                  .addCase(updateProduct.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                    state.loading = false;
                    const index = state.products.findIndex((product) => product._id === action.payload._id);
                    if (index !== -1) {
                      state.products[index] = action.payload;
                    }
                  })
                  .addCase(updateProduct.rejected, (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload;
                  })

                  .addCase(deleteProduct.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.products = state.products.filter((product) => product._id !== action.payload);
                  })
                  .addCase(deleteProduct.rejected, (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload;
                  })
                
    }
})


export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;