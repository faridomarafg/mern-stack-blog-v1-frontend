import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../features/post/postSlice';
import Spinner from '../components/Spinner';



function SinglePost() {
    const dispatch = useDispatch();
    const {post, loading} = useSelector((state)=> state.post);
    const {id} = useParams();

    useEffect(()=>{
        if(id){
            dispatch(getPost(id));
        }
    },[id,dispatch]);

  if(loading){
    return <Spinner/>
  }  

  return (
        <div className='flex w-full h-fit pt-[160px] items-center justify-center'>
            <section className='w-full sm:w-[70%] md:w-[60%] h-[10%] border bg-slate-400 rounded-t-lg shadow-lg shadow-black relative'>
              <img src={post.photo} className='w-full h-[400px] object-cover rounded-t-lg' alt="" />

              <div className='flex w-full justify-between pt-3'>
              <h1 className=' bg-slate-300 text-teal-600 px-3 rounded-lg'>Title:{post.title}</h1>
              <p className=' font-playfair font-boldbg-slate-300 text-teal-600 bg-slate-300 px-3 rounded-lg'>On: 
              <span className='font-thin text-teal-600'>
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              </p>
              </div>

              <p className='p-3 text-3xl font-playfair pt-5 text-slate-700'>Description:&nbsp;
                <span className='font-playfair text-lg text-slate-200 '>
                  {post.description}
                </span>
              </p>
            </section>
        </div>
    )
}

export default SinglePost