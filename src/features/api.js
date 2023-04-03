import axios from "axios";

const API = axios.create({baseURL: process.env.REACT_APP_BACKEND_URL});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

//Login User
export const login = (userData) => API.post('/api/users/login', userData);

//Rgister User
export const register = (userData) => API.post('/api/users/register', userData);

//Create Post
export const createPost = (postData) => API.post('/api/posts', postData);


//Get all Posts
//export const getPosts = () => API.get('/api/posts' );
export const getPosts = (page) => API.get(`/api/posts?page=${page}`);

//Get postById
export const getPost = (id) => API.get(`/api/posts/${id}`);

//Delete Post
export const deletePost = (id) => API.delete(`/api/posts/${id}`);

//Update Post
export const updatePost = (updatedData, id) => API.put(`/api/posts/${id}`, updatedData);

//Get postsByUser
export const getPostByuser = (id) => API.get(`/api/posts/userPosts/${id}`);//ID in this route is user-id not post-id

//Like Post
export const likePost = (id) => API.patch(`/api/posts/like/${id}`);

//Create comment on post
export const createComment = (commentData, id) => API.post(`/api/comments/${id}`, commentData);

//Get comment by postID
export const getComments = (id) => API.get(`/api/comments/${id}`);//ID in this route is user-id not post-id

//Delete comment
export const deleteComment = (id)=> API.delete(`/api/comments/${id}`);