import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async(_, {rejectWithValue}) => {
        try{
            const response = await axios.get('http://localhost:3000/api/admin/users', {withCredentials: true});
            return response.data.users;
        }catch(err){
            return rejectWithValue(err.response.data);
        }
    }
);


export const addUser = createAsyncThunk(
    'user/addUser',
    async(userData, {rejectWithValue})=>{
        try{
            const response = await axios.post('http://localhost:3000/api/admin/add-user', userData, {withCredentials: true});
            return response.data.newUser;
        } catch(err){
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async(userData, {rejectWithValue})=>{
        try{
            const response = await axios.put(`http://localhost:3000/api/admin/users/${userData._id}`, userData, {withCredentials: true});
            return response.data;
        }
        catch(err){
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async(userId, {rejectWithValue}) => { 
        try{
            await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, {withCredentials: true});
            return userId;
        }
        catch(err){
            return rejectWithValue(err.response.data);
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState:{
        users:[],
        filteredUsers:[],
        loading:false,
        error:null,
        searchTerm:''
    },
    reducers:{
        setSearchTerm:(state, action)=>{
            state.searchTerm = action.payload;
            if(action.payload===''){
                state.filteredUsers=state.users;
            } else{
                console.log("search payload:", action.payload)
                state.filteredUsers = state.users.filter(user=>
                    user.username.toLowerCase().includes(action.payload.toLowerCase())||
                    user.email.toLowerCase().includes(action.payload.toLowerCase())     
                );
            }
        },
        clearSearch: (state)=>{
            state.searchTerm='';
            state.filteredUsers=state.users;
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchUsers.pending, (state)=>{
                state.loading = true;
            })

            .addCase(fetchUsers.fulfilled,(state, action)=>{
                state.users = action.payload;
                state.filteredUsers= action.payload
                state.loading = false;
                state.error = null;
            })

            .addCase(fetchUsers.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload.message;
            })

            .addCase(addUser.fulfilled, (state, action)=>{
                state.users.push(action.payload);
            })

            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
              })



            //   .addCase(updateUser.fulfilled, (state, action) => {
            //     state.loading = false;
            //     const updatedUser = action.payload;
            //     const index = state.users.findIndex(user => user._id === updatedUser._id);
            //     if (index !== -1) {
            //       state.users = [
            //         ...state.users.slice(0, index),
            //         updatedUser,
            //         ...state.users.slice(index + 1)
            //       ];
            //     }
            //     console.log('State after update:', action.payload);
            //   })



              .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Failed to update user';
              })

            .addCase(updateUser.fulfilled, (state, action)=>{
                const index = state.users.findIndex(user => user._id === action.payload._id);
                if(index !==-1){
                    console.log("action payload:",action.payload)
                    state.users[index]= action.payload;
                }
            })

            .addCase(deleteUser.fulfilled, (state, action)=>{
                state.users = state.users.filter(user => user._id !==action.payload);
            });
    }   
})

export const { setSearchTerm, clearSearch } = userSlice.actions;
export default userSlice.reducer