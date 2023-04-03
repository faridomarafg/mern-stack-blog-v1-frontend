import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import * as api from "../api";
import {toast} from 'react-toastify';


//Create Post
export const createPost = createAsyncThunk('post/createPost', async(postData, thunkAPI)=>{
    try {
        const response = await api.createPost(postData);
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


//Get all Posts no pagination
// export const getPosts = createAsyncThunk('post/getPosts', async(_, thunkAPI)=>{
//     try {
//         const response = await api.getPosts ();
//         return response.data
//     } catch (error) {
//         const message =
//         (error.response &&
//         error.response.data &&
//         error.response.data.message) ||
//         error.message ||
//         error.toString()
//         return thunkAPI.rejectWithValue(message)     
//     }
// });

//Get all Posts with pagination
export const getPosts = createAsyncThunk('post/getPosts', async(page, thunkAPI)=>{
    try {
        const response = await api.getPosts (page);
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

//Get postById
export const getPost = createAsyncThunk('post/getPost', async(id, thunkAPI)=>{
    try {
        const response = await api.getPost (id);
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


//Get postByUserID
export const getPostByUser = createAsyncThunk('post/getPostByUser', async(id, thunkAPI)=>{
    try {
        const response = await api.getPostByuser (id);
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

//Delete Post
export const deletePost = createAsyncThunk('post/deletePost', async(id, thunkAPI)=>{
    try {
        const response = await api.deletePost(id);
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


//Update Post
export const updatePost = createAsyncThunk('post/updatePost', async({updatedData ,id}, thunkAPI)=>{
    try {
        const response = await api.updatePost(updatedData ,id);
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


//Like post
export const likePost = createAsyncThunk('post/likePost', async({_id}, thunkAPI)=>{//here id should be in the form of object 
    try {
        const response = await api.likePost (_id);
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


const postSlice = createSlice({
    name:'post',
    initialState:{
        post:{},
        posts:[],
        userPosts:[],
        error:'',
        loading:false,
        currentPage:1,
        numberOfPages: null,
        comments:[] 
    },
    reducers:{
      setCurrentPage:(state, action)=>{
        state.currentPage = action.payload
      }
    },
    extraReducers:(builder)=>{
     builder

    //Create Post
    .addCase(createPost.pending, (state, )=>{
    state.loading = true
    })
    .addCase(createPost.fulfilled, (state, action)=>{
    state.loading = false;
    state.posts = [action.payload]
    toast.success('Post created successfully!')
    })
    .addCase(createPost.rejected, (state, action)=>{
    state.loading = false;
    state.error = action.payload;
    })

    //Get all Posts
    .addCase(getPosts.pending, (state, )=>{
    state.loading = true
    })
    // .addCase(getPosts.fulfilled, (state, action)=>{
    // state.loading = false;
    // state.posts = action.payload;
    // })
    .addCase(getPosts.fulfilled, (state, action)=>{
    state.loading = false;
    state.posts = action.payload.data;//data added to postcontroller 
    state.numberOfPages = action.payload.numberOfPages;
    state.currentPage = action.payload.currentPage
    })
    .addCase(getPosts.rejected, (state, action)=>{
    state.loading = false;
    state.error = action.payload;
    })

    //Get single Post
    .addCase(getPost.pending, (state, )=>{
    state.loading = true
    })
    .addCase(getPost.fulfilled, (state, action)=>{
    state.loading = false;
    state.post = action.payload;//sence it's a get route we dont need array brachets;
    })
    .addCase(getPost.rejected, (state, action)=>{
    state.loading = false;
    state.error = action.payload;
    })

    //Get PostsByUser
    .addCase(getPostByUser.pending, (state, )=>{
    state.loading = true
    })
    .addCase(getPostByUser.fulfilled, (state, action)=>{
    state.loading = false;
    state.userPosts = action.payload;//sence it's a get route we dont need array brachets;
    })
    .addCase(getPostByUser.rejected, (state, action)=>{
    state.loading = false;
    state.error = action.payload;
    })

    //Delete Post
    .addCase(deletePost.pending, (state, )=>{
    state.loading = true
    })
    .addCase(deletePost.fulfilled, (state, action)=>{
    state.loading = false;
    const {arg} = action.meta;
    if(arg){
        state.userPosts = state.userPosts.filter((item)=> item._id !== arg);
        state.posts = state.posts.filter((item)=> item._id !== arg);
    }
    })
    .addCase(deletePost.rejected, (state, action)=>{
    state.loading = false;
    state.error = action.payload;
    })

    //Update Post
    .addCase(updatePost.pending, (state, )=>{
    state.loading = true
    })
    .addCase(updatePost.fulfilled, (state, action)=>{
    state.loading = false;
    const {arg :{id}} = action.meta;
    if(id){
        state.userPosts = state.userPosts.map((item)=> item._id === id ? action.payload : item);
        state.posts = state.posts.map((item)=> item._id === id ? action.payload : item);
    }
    })
    .addCase(updatePost.rejected, (state, action)=>{
    state.loading = false;
    state.error = action.payload;
    })
    
    //Like Post
    .addCase(likePost.pending, (state, )=>{
     //we leave it empty, otherwise when ever we click like button it would reload the page
    })
    .addCase(likePost.fulfilled, (state, action)=>{
    state.loading = false;
    const {arg :{_id}} = action.meta;
    if(_id){
        state.posts = state.posts.map((item)=> item._id === _id ? action.payload : item);
    }
    })
    .addCase(likePost.rejected, (state, action)=>{
    state.error = action.payload;
    console.log(action.payload);
    })
    }
});

export const {setCurrentPage}  =postSlice.actions;

export default postSlice.reducer;