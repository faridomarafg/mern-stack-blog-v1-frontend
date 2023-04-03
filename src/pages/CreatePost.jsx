import React, { useState, useEffect } from 'react'
import imageToBase64 from '../utility/imageToBase64';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { createPost } from '../features/post/postSlice';

const initialState = {
title:"",
description:"",
photo:'',
}

function CreatePost() {
const navigate = useNavigate();
const dispatch = useDispatch();

const [postData, setPostData] = useState(initialState);

const {title, description, photo} = postData;

const {error, loading} = useSelector((state)=> state.post);

const {user} = useSelector((state)=> state.auth);

const isUser = JSON.parse(localStorage.getItem("profile"));

useEffect(()=>{//this used if there is any error
  !isUser && navigate('/login');
},[error, navigate, isUser]);




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
    
    setPostData((preve)=>{
        return{
        ...preve,
        photo: data
        }
    })
}  


const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    const postData={
      title,
      description,
      photo,
      name: user?.user.name,
      creator: user?.user._id 
    }

    dispatch(createPost(postData));
    navigate('/');
  };
  
  if(loading){
    return <h1>Loading...</h1>
  }
  
  return (
    <div className='pt-[140px] w-full h-screen mb-10 flex flex-col items-center '>
        <h1 className='sm:text-2xl md:text-4xl text-teal-600 font-playfair py-5'>Create Post</h1>
        <form className='w-full sm:w-[80%] md:w-[50%] bg-slate-400 sm:rounded-lg md:rounded-lg' onSubmit={onSubmitHandler}>

        <div className='flex items-center justify-center w-full h-40 bg-blue-200 mb-3 rounded-t-lg border-2 border-slate-400 relative '>
            <label htmlFor='profileImage' className='w-full h-full'>
            <div className='w-full h-full flex items-center justify-center'>
                {
                postData.photo ?  <img className='w-full h-full rounded-lg' alt='postPhoto' src={ postData.photo && postData.photo }  />  
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
        className='w-full h-9 border-2 border-slate-400 p-4 bg-white outline-none'
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
        className='w-full border-2 border-slate-400 my-3 p-4 bg-white outline-none'
        />
                    
        <button className='w-full mt-3 text-teal-600 border-2 border-slate-400 p-1 bg-white' type='submit'>Submit</button>
        <button onClick={handleClear} className='w-full my-4  border-2 border-slate-400 p-1 text-teal-600 bg-white' type='button'>Clear</button>

        </form>
    </div>
  )
}

export default CreatePost