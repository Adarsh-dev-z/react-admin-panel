import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', credentials, { withCredentials: true });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.get('http://localhost:3000/api/user/logout', { withCredentials: true });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async(credentials, { rejectWithValue }) => {
    try{
      const response = await axios.post('http://localhost:3000/api/user/register', credentials, { withCredentials: true });
      return response.data;
    }catch(err){
      return rejectWithValue(err.response.data);
    }
  }
);

export const adminLogin = createAsyncThunk(
  'auth/admin-login',
  async(credentials, { rejectWithValue }) => {
    try{
      const response = await axios.post('http://localhost:3000/api/admin/admin-login', credentials, { withCredentials: true });
      return response.data;
    }catch(err){
      return rejectWithValue(err.response.data);
    }
  }
)

export const adminLogout = createAsyncThunk(
  'auth/admin-logout',
  async(_, {rejectWithValue}) =>{
    try{
      await axios.get('http://localhost:3000/api/admin/admin-logout', { withCredentials: true });
    }catch(err){
      return rejectWithValue(err.response.data);
    }
  }
)

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/api/user/auth-status', { withCredentials: true });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    userRole: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        console.log(action.payload);
        state.userRole = action.payload.role;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userRole = null;
        state.error = action.payload.message;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log(state)
        state.isAuthenticated = false;
        state.userRole = null;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userRole = action.payload.userRole;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userRole = null;
        state.error = action.payload.message;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isAuthenticated = true;
        state.userRole = action.payload.role;
        state.error = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userRole = null;
        state.error = action.payload.message;
      })
      .addCase(adminLogout.fulfilled, (state)=>{
        state.isAuthenticated = false;
        state.userRole = null;
        state.error = null;
      })
      
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userRole = action.payload.role;
        state.loading = false;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isAuthenticated = false;
        state.userRole = null;
        state.loading = false;
        state.error = null;
      });
  }
});

export default authSlice.reducer;


// authSlice.js



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://localhost:3000/api/user/login", credentials, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const logout = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       await axios.post("http://localhost:3000/api/user/logout", {}, {
//         withCredentials: true,
//       });
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const fetchAuthStatus = createAsyncThunk(
//   "auth/fetchAuthStatus",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/user/auth-status", {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isAuthenticated: false,
//     userRole: null,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         state.userRole = action.payload.role;
//         state.error = null;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isAuthenticated = false;
//         state.userRole = null;
//         state.error = action.payload.message;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.isAuthenticated = false;
//         state.userRole = null;
//         state.error = null;
//       })
//       .addCase(fetchAuthStatus.fulfilled, (state, action) => {
//         state.isAuthenticated = action.payload.isAuthenticated;
//         state.userRole = action.payload.role;
//         state.error = null;
//       })
//       .addCase(fetchAuthStatus.rejected, (state, action) => {
//         state.isAuthenticated = false;
//         state.userRole = null;
//         state.error = action.payload.message;
//       });
//   },
// });

// export default authSlice.reducer;