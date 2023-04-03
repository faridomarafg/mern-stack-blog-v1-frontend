import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from "../api";
import {toast} from 'react-toastify';


//Login User
export const login = createAsyncThunk('auth/login', async(userData, thunkAPI)=>{
    try {
        const response = await api.login(userData);
        return response.data
    } catch (error) {
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)     
    }
});


//Register User
export const register = createAsyncThunk('auth/register', async(userData, thunkAPI)=>{
    try {
        const response = await api.register(userData);
        return response.data
    } catch (error) {
        const message =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)     
    }
});

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        error:'',
        loading:false
    },
    reducers:{
        setUser:(state, action)=>{
           state.user = action.payload 
        },
        setLogout:(state)=>{
          localStorage.clear();
          state.user= null  
        }
    },
    extraReducers:(builder)=>{
     builder

     //Login
     .addCase(login.pending, (state, )=>{
        state.loading = true
     })
     .addCase(login.fulfilled, (state, action)=>{
        state.loading = false
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
        toast.success('user logged in successfully!')
     })
     .addCase(login.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload;
     })

    //Register
    .addCase(register.pending, (state, )=>{
    state.loading = true
    })
    .addCase(register.fulfilled, (state, action)=>{
    state.loading = false
    localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
    state.user = action.payload;
    toast.success('User registered successfully!')
    })
    .addCase(register.rejected, (state, action)=>{
    state.loading = false;
    state.error = action.payload;
    })
    }
});


export const {setUser, setLogout} = authSlice.actions;

export default authSlice.reducer;