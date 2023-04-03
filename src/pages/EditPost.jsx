import React, { useState, useEffect } from 'react'
import imageToBase64 from '../utility/imageToBase64';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {updatePost } from '../features/post/postSlice';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const initialState = {
title:"",
description:"",
photo:'',
}

function EditPost() {
const navigate = useNavigate();
const dispatch = useDispatch();

const [postData, setPostData] = useState(initialState);

const {title, description, photo} = postData;

const {error, loading, posts} = useSelector((state)=> state.post);

const {user} = useSelector((state)=> state.auth);

const {id} = useParams();

const isUser = JSON.parse(localStorage.getItem('profile'));//user for chacking is user logged in or not to have access this page

useEffect(()=>{//this use for persist the targeted post data in form input;
  const singlePost = posts.find((post)=> post._id === id);
  setPostData({...singlePost});
  if(posts.length <1){
    navigate('/')
  }
},[id, navigate, posts]);

useEffect(()=>{//this used if there is any error
  error && toast.error(error);
  if(!isUser){
    navigate('/login');
    toast.error('Please login first to have access edit post!')
  }
},[error, isUser, navigate]);


const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleClear = () => {
    setPostData({ title: "", description: "", tags: [] });
  };

  
//this function is for handling profile image uploading;
//for showing image in profile section we should convert image to Base64;
//for this purpose we are going create a file with name of imageToBase64 in utility folder in src folder;
const handleUploadImage =async (e)=>{
    const data = await imageToBase64(e.target.files[0]);
    console.log(data);

    setPostData((preve)=>{
        return{
        ...preve,
        photo: data
        }
    })
}  


const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(title && description && photo){
      const updatedData = {...postData,name: user?.user.name, creator: user?.user._id }
      dispatch(updatePost({id, updatedData}));
      navigate('/')
    }

  };

  
  if(loading){
    return <Spinner/>
  }
  
  return (
    <div className='pt-[140px] w-full h-screen flex flex-col items-center'>
        <h1 className='text-4xl w-full text-center text-teal-600 font-playfair py-3'>Edit Post</h1>
        <form className='w-full sm:w-[70%] md:w-[50%] bg-slate-400 border-2 border-slate-600 rounded-lg' onSubmit={onSubmitHandler}>

        <div className='flex items-center justify-center w-full h-60 bg-blue-200 mb-3 rounded-t-lg border-2 border-slate-400 shadow-md shadow-black relative '>
            <label htmlFor='profileImage' className='w-full h-full'>
            <div className='w-full h-full flex items-center justify-center'>
                {
                postData.photo ?  <img className='w-full h-full rounded-t-lg object-cover' alt='postPhoto' src={ postData.photo && postData.photo }  />  
                :
                <p className='text-sm p-1 text-white cursor-pointer'>Upload</p>
                }
            </div>
            <input type={"file"} id="profileImage" accept='image/*' className='hidden' value="" onChange={handleUploadImage} />
            </label>
        </div>

        <input 
        type="text"
        placeholder='Title'
        className='w-full my-3 outline-none px-3 py-1'
        name='title'
        value={title}
        onChange={onChangeHandler}
        />

        <textarea 
        name="description" 
        placeholder='Description'
        value={description}
        onChange={onChangeHandler}
        rows="4"
        className='w-full px-3 py-1 text-gray-500 mb-3'
        />
                    
        <button className='w-full text-teal-600 shadow-lg p-1 bg-white' type='submit'>Update</button>
        <button onClick={handleClear} className='w-full my-4 bg-white border-slate-400 p-1 text-teal-600 ' type='button'>Clear</button>

        </form>
    </div>
  )
}

export default EditPost