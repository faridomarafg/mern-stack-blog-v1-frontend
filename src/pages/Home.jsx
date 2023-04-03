import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Pagination from '../components/Pagination';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import { getPosts, setCurrentPage } from '../features/post/postSlice';

function Home() {
  const dispatch = useDispatch();

  const {posts, loading, currentPage, numberOfPages} = useSelector((state) => state.post);

  useEffect(()=>{
    dispatch(getPosts(currentPage));
  },[currentPage,dispatch])

  if(loading){
    return <Spinner/>
  }

  return (
    <div className='w-full h-screen'>
    <div className='pt-[160px] md:px-10 grid md:grid-cols-3 gap-8'>
      {posts.map((post, index)=>(
        <PostCard key={index} {...post}/>
      ))}
    </div>
    <Pagination 
    setCurrentPage={setCurrentPage}
    numberOfPages={numberOfPages}
    currentPage={currentPage}
    dispatch={dispatch}
    />
    </div>
  )
}

export default Home