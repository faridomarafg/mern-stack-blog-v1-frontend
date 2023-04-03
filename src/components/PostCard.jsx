import React from 'react'
import {Link} from 'react-router-dom';
import {AiOutlineLike,
AiOutlineEdit,
AiFillDelete, 
AiFillLike,
AiOutlineSend,
AiOutlineClose
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../features/post/postSlice';
import {toast} from 'react-toastify';
import { useState } from 'react';
import { createComment, deleteComment, getComments } from '../features/comment/commentSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const initialState = {
  text:"",
  }

function PostCard({title,description,photo,createdAt,_id,name, creator, likes}) {
  const [toggleComment, setToggleComment] = useState(true); 
  const dispatch = useDispatch();  
  const {user} = useSelector((state)=> state.auth);

  const [commentData, setCommentData] = useState(initialState);

  const {text} = commentData;

  const userId = user?.user._id; 

  const {id} = useParams()

  const {comments} = useSelector((state)=> state.comment);

  
  //DeleteHandeler function
  const handleDelete = ()=>{
    dispatch(deletePost(_id));//here id also id should be in the form of object;
    toast.success('Post Deleted Successfyll!')
  }
  

  const excerpt = (str)=>{
    if(str?.length > 65){
        str = str.substring(0, 65)+ '...'
    }
    return str
  };  

  const handleLike = ()=>{
    dispatch(likePost({_id}))  
  };

  const commentToggleHandler = ()=>{
    setToggleComment(!toggleComment);
   
  };
  
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCommentData({ ...commentData, [name]: value });
  };


  const commentFormSubmitHandler = async (e) => {
    e.preventDefault();
    
    const commentData={
      text
    };
    
    dispatch(createComment({commentData, id}));
    setCommentData(initialState)
  };

  useEffect(()=>{
   dispatch(getComments(id))
  },[id, dispatch])

  return (
  <section className='flex flex-col  w-full h-fit border-2 pb-5  bg-slate-400 relative rounded-t-xl hover:scale-105 duration-1000'>
    
    <img src={photo} className='w-full h-[300px] object-cover rounded-t-xl ' alt="" />
  
    <div>
      <h1 className='bg-slate-400 px-[6px] py-[2px] rounded-lg text-white font-playfair absolute top-2 left-2'>By:&nbsp; 
      <span className='text-teal-600 font-semibold'>{name}</span>
      </h1>

      <h1 className='bg-slate-400 px-[6px] py-[2px] rounded-lg text-white font-playfair absolute top-2 right-2'>Title:&nbsp; 
      <span className='text-teal-600 font-semibold'>
        {title}
      </span>
      </h1>
    </div> 

    <div className='flex w-full justify-between px-2 pt-3 relative'>
      {creator === userId &&(

      <><Link to={`/editPost/${_id}`}>
        <AiOutlineEdit className='absolute bottom-4 cursor-pointer text-teal-600 font-semibold bg-slate-300 rounded-lg p-1 hover:scale-110 duration-700 ' size={30}/>
      </Link>
    
      <AiFillDelete 
      onClick={handleDelete} 
      className='absolute bottom-4 right-2 cursor-pointer text-red-700 font-semibold bg-slate-300 rounded-lg p-1 hover:scale-110 duration-700 ' 
      size={30}
      />
      </>)}
    </div>
       
    
    <div className='flex w-full justify-between px-2'>
      {/* LIKE SECTION */}
    {user &&<div className={likes?.length>1 ?'flex gap-1 bg-slate-300 w-[190px] items-center justify-center rounded-lg' 
    :'flex gap-1 bg-slate-300 w-[40px] p-[2px] items-center justify-center rounded-lg' }>
      {likes?.length > 0 ? 
      (<AiFillLike className='text-blue-500 cursor-pointer hover:scale-110 duration-700' onClick={handleLike} size={20}/>) 
      :(<AiOutlineLike className='text-blue-500 cursor-pointer hover:scale-110 duration-700' onClick={handleLike} size={20}/>)}
      {likes?.length >1 ? 
      (<p className='font-playfair text-white text-[14px]'>You and <span className='text-teal-600 text-[20px]'>{likes?.length}</span> others Likes</p>) 
      :''}
    </div>}
     {/* Comment section */}
    <div onClick={commentToggleHandler} >
       {user && <button 
       className='bg-slate-300 px-2 py-[3px] rounded-lg text-white'>
        <Link to={`/${_id}`}>comment</Link>
       </button>}
    </div> 
    </div>
    {/* <div className={toggleComment ? 'hidden': 'block'}><Comment/></div> */}
    <form onSubmit={commentFormSubmitHandler} className={toggleComment ? 'hidden': 'block, relative'}>
    <input 
      type="text" 
      name='text'
      placeholder='comment' 
      className='w-full my-1 outline-none'
      value={text}
      onChange={onChangeHandler}
      />  
      <div>
      {
         comments?.map((comment)=>(
        <section key={comment._id}>
          <div className='flex w-full bg-slate-50 border-b-2 border-slate-600 py-1'>
           <p className='rounded-lg bg-slate-200 text-slate-500 h-fit px-1 flex'>{comment.user.name}</p>
           {comment && <p className='rounded-lg bg-slate-200 px-1 flex-1 pl-4 text-slate-500 font-playfair'>{comment.text}</p>}
           <span className='relative'>
            {comment.user._id === userId &&<AiOutlineClose onClick={()=> dispatch(deleteComment(comment._id))} className='absolute right-1 top-1 cursor-pointer'/>}
           </span>
          </div>
        </section>
      ))
      }
      </div>  
     <button type='submit'> <AiOutlineSend className='absolute top-2 right-2'/></button>
    </form>
    <p className='font-playfair font-bold text-slate-700'>On: <span className='font-thin text-slate-200'>{new Date(createdAt).toLocaleDateString()}</span></p>
    <p className='font-playfair font-bold text-slate-700'>
      Description:&nbsp;<span className='font-thin text-slate-200'>{excerpt(description)}</span>
    {description.length>65 &&<Link to={`/post/${_id}`}><span className='text-slate-700 text-semibold' >Red More...</span></Link>}
    </p>
  </section>
  )
}

export default PostCard