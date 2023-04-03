import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from "../api";
import {toast} from 'react-toastify';


//create comment
export const createComment = createAsyncThunk('comment/createComment', async({commentData ,id}, thunkAPI)=>{
    try {
        const response = await api.createComment(commentData ,id);
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


//Get all comments for a post
export const getComments = createAsyncThunk('comment/getComments', async(id, thunkAPI)=>{
    try {
        const response = await api.getComments(id);
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


//Delete Comment
export const deleteComment = createAsyncThunk('comment/deleteComment', async(id, thunkAPI)=>{
    try {
        const response = await api.deleteComment(id);
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



const commentSlice = createSlice({
    name:'comment',
    initialState:{
        comments:[],
        comment:null,
        loading: false 
    },
    reducers:{
    },
    extraReducers:(builder)=>{
      builder

    //Create comment
    .addCase(createComment.pending, (state, )=>{
    state.loading = true
    })
    .addCase(createComment.fulfilled, (state, action)=>{
    state.loading = false;
    state.comments = [action.payload]
    toast.success('comment posted successfully!')
    })
    .addCase(createComment.rejected, (state, action)=>{
    state.loading = false;
    state.error = action.payload;
    })

    //Get all comments for a post
    .addCase(getComments.pending, (state, )=>{
    state.loading = true
    })
    .addCase(getComments.fulfilled, (state, action)=>{
    state.loading = false;
    state.comments = action.payload
    })
    .addCase(getComments.rejected, (state, action)=>{
    state.loading = false;
    state.error = action.payload;
    })

    //Delete Comment
    .addCase(deleteComment.pending, (state, )=>{
    state.loading = true
    })
    .addCase(deleteComment.fulfilled, (state, action)=>{
    state.loading = false;
    const {arg} = action.meta;
    if(arg){
        state.comments = state.comments.filter((item)=> item._id !== arg);
    }
    })
    .addCase(deleteComment.rejected, (state, action)=>{
    state.loading = false;
    state.error = action.payload;
    })
    }
});


export default commentSlice.reducer;