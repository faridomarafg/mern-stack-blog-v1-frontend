import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {AiOutlineEdit,AiFillDelete} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPostByUser } from '../features/post/postSlice';
import {toast} from 'react-toastify';
import Spinner from '../components/Spinner';


function Dashoboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user}  = useSelector((state)=> state.auth);
  const {userPosts, loading }  = useSelector((state)=> state.post);

  const userId = user?.user?._id;//we use it to display the logged user post in dashboard;

  const isUser = JSON.parse(localStorage.getItem('profile'));//user it to protect dashboard route for unlogged user;

  useEffect(()=>{//this used to prevent un logged user to have access to dashboard;
    if(!isUser){
      navigate('/login');
      toast.error('Please login first to have access to Dashboard!');
    }
  },[navigate, isUser])

  useEffect(()=>{
     if(userId){
      dispatch(getPostByUser(userId))
     }
  },[userId,dispatch]);


    //DeleteHandeler function
    const handleDelete = (id)=>{
      dispatch(deletePost(id));
      toast.success('Post Deleted Successfyll!')
    }

  const excerpt = (str)=>{
    if(str.length > 65){
        str = str.substring(0, 65)+ '...'
    }
    return str
  }; 

  if(loading){
    return <Spinner/>
  }

  return (
    <div className='pt-[160px] '>
      <div>
        <h1 className='w-full text-center text-4xl font-semibold text-slate-400'>Dashboard : 
        <span className='font-playfair font-semibold text-teal-400'>{user?.user?.name}</span>
        </h1>
        <hr />
      </div>

      <div className=' grid md:grid-cols-3 gap-5 pt-3'>
        {userPosts.map((post)=>(
          <div key={post._id} className='px-3'>
            <div className='bg-slate-400 rounded-t-lg w-full h-full font-playfair relative'>
              <div>
                <img 
                src={post.photo} 
                alt='postImg' 
                className='w-full h-[300px] object-cover rounded-t-lg'
                />
              </div>
              {/* ICONS */}
              <div className='flex w-full justify-between px-2 absolute bottom-[90px]'>
                <Link to={`/editPost/${post._id}`}>
                  <AiOutlineEdit className='text-teal-600 text-2xl cursor-pointer bg-slate-300 p-1 rounded-lg'/>
                </Link>
                <AiFillDelete 
                onClick={()=>handleDelete(post._id)} 
                className='text-red-600 text-2xl cursor-pointer bg-slate-300 p-1 rounded-lg'
                />
              </div>
              {/* DATE AND TITLE */}
              <div className='flex justify-between'>
                <span className='bg-teal-600 text-white p-[2px] rounded-lg m-1'>{post.title}</span>
                <span className='bg-teal-600 text-white p-[2px] rounded-lg m-1'>On: {new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              {/* DESCRIPTION */}
              <p className='font-bold text-slate-700'>Description:&nbsp;<span className='font-thin text-slate-200'>{excerpt(post.description)}</span>
                <Link to={`/post/${post._id}`}><span className='text-slate-700 text-semibold' >Red More...</span></Link>
              </p>
            </div>
          </div>
        ))}
      </div> 
    </div>
  )
}

export default Dashoboard