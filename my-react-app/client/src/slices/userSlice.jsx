import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:3000/api/admin/users", { withCredentials: true });
        return response.data.users;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const addUser = createAsyncThunk("user/addUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:3000/api/admin/add-user", userData, { withCredentials: true });
        return response.data.newUser;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const updateUser = createAsyncThunk("user/updateUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.put(`http://localhost:3000/api/admin/users/${userData._id}`, userData, { withCredentials: true });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (userId, { rejectWithValue }) => {
    try {
        await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, { withCredentials: true });
        return userId;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const bulkDelete = createAsyncThunk("user/bulkDelete", async (userIds, { rejectWithValue})=>{
    try{
        const response = await axios.post('http://localhost:3000/api/admin/bulk-delete', userIds, { withCredentials: true });
        return response;
    }
    catch(err){
        return rejectWithValue(err.response.data);
    }
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        filteredUsers: [],
        loading: false,
        error: null,
        searchTerm: "",
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            if (action.payload === "") {
                state.filteredUsers = state.users;
            } else {
                state.filteredUsers = state.users.filter((user) => 
                user.username.toLowerCase().includes(action.payload.toLowerCase()) ||
                user.email.toLowerCase().includes(action.payload.toLowerCase()));
            }
        },
        clearSearch: (state) => {
            state.searchTerm = "";
            state.filteredUsers = state.users;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            state.filteredUsers = action.payload;
        },
        setFilteredUsers: (state, action) => {
            state.filteredUsers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.filteredUsers = action.payload;
                state.loading = false;
                // state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.payload ? action.payload.message : ["Failed to add user"]; 
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const index = state.users.findIndex((user) => user._id === updatedUser._id);

                if (index !== -1) {
                    state.users[index] = updatedUser;

                    const filteredIndex = state.filteredUsers.findIndex((user) => user._id === updatedUser._id);
                    if (filteredIndex !== -1) {
                        state.filteredUsers[filteredIndex] = updatedUser;
                    }
                }
                state.loading = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : ["Failed to update user"];
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user._id !== action.payload);
                state.filteredUsers = state.filteredUsers.filter((user) => user._id !== action.payload);
                state.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload ? action.payload.message : ["Failed to delete user"];
            })
            .addCase(bulkDelete.rejected, (state, action) =>{
                state.error= action.payload ? action.payload.message : ["Failed to delete users"];
            })
            .addCase(bulkDelete.fulfilled, (state, action) =>{
                state.users = state.users.filter((user) = user._id !== action.payload);
                state.filteredUsers = state.filteredUsers.filter((user) = user._id !== action.payload);
                state.error = null;
            })
    },
});

export const { setSearchTerm, clearSearch, setUsers, setFilteredUsers } = userSlice.actions;
export default userSlice.reducer;
