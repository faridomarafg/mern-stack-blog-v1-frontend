import {Link, useNavigate} from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi';
import {AiOutlineClose} from 'react-icons/ai';
import { useState } from 'react';
import {useSelector, useDispatch}  from 'react-redux';
import { setLogout } from '../features/auth/authSlice';
import decode from 'jwt-decode';



const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state)=> state.auth);

    const token = user?.token;//user for token expiration

    if(token){//if token expired the this condation fire;
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()){
        dispatch(setLogout())
      }
    }

    const [nav, setNav] = useState(false);
    const handleClick = () => setNav(!nav);

    const handleClose =()=> setNav(!nav);

 
  const onLogout = ()=>{
    dispatch(setLogout());
    navigate('/login')
  }
    
   

  return (
    <div className='w-full h-[140px] z-10 bg-slate-400 text-white fixed drop-shadow-lg'>

      <div className='px-2 flex justify-between items-center w-full h-full'>
        <div className='flex items-center justify-between w-full'>
          <h1 className='text-xl font-bold mr-4 sm:text-3xl font-playfair hover:scale-110 duration-1000 pl-4'>
            <Link to='/'>AFG - DEVS - BLOG</Link>
          </h1>
          {user &&<p>Logged in as : {user?.user.name}</p>}
          <ul className='hidden md:flex gap-6'>
          {user ? 
          (<>
          <li className='hover:scale-110 font-semibold duration-1000 text-xl'>
            <Link className='hover:text-emerald-600 duration-1000 ' to="/"  >Home</Link>
          </li>
          <li className='hover:scale-110 font-semibold duration-1000 text-xl'>
            <Link className='hover:text-emerald-600 duration-1000 ' to="/createpost"  >CreatePost</Link>
          </li>
          <li className='hover:scale-110 font-semibold duration-1000 text-xl'>
            <Link className='hover:text-emerald-600 duration-1000 ' to="/dashboard"  >Dashboard</Link>
          </li>
          <li className='hover:scale-110 hover:text-emerald-600 font-semibold duration-1000 text-xl'>
            <button onClick={onLogout}>Logout</button>
          </li>
          </>)
          :
          (<>
          <li className='hover:scale-110 font-semibold duration-1000 text-xl'>
            <Link className='hover:text-emerald-600 duration-1000 ' to="/login"  >Login</Link>
          </li>
          <li className='hover:scale-110 font-semibold duration-1000 text-xl'>
            <Link className='hover:text-emerald-600 duration-1000 ' to="/register"  >Register</Link>
          </li>
          </>)}
          </ul>
          
        </div>
        <div className='hidden md:flex pr-4'>

          
        </div>
        <div className='md:hidden mr-4' onClick={handleClick}>
            {!nav ? <p className='hover:scale-110 duration-1000 hover:text-emerald-600'><GiHamburgerMenu size={35}/></p> : <p className='hover:scale-125 duration-1000 hover:text-emerald-600'><AiOutlineClose size={35}/></p> }
        </div>
      </div>

      <ul className={!nav ? 'absolute bg-slate-400 opacity-70 w-[300px] h-screen px-8 right-[-300px] items-center justify-center flex flex-col duration-1000' 
      : 
      'absolute bg-slate-400 opacity-70  w-[300px] h-screen px-8 right-0 items-center justify-center flex flex-col gap-6 duration-1000'
      }>
        {user? 
        (<>
          <li className='hover:scale-110 font-semibold duration-1000 text-xl'>
            <Link onClick={handleClose} className='hover:text-emerald-600 duration-1000 ' to="/"  >Home</Link>
          </li>
          <li className='hover:scale-110 font-semibold duration-1000 text-xl'>
            <Link onClick={handleClose} className='hover:text-emerald-600 duration-1000 ' to="/createpost"  >Create Post</Link>
          </li>
          <li className='hover:scale-110 font-semibold duration-1000 text-xl'>
            <Link onClick={handleClose} className='hover:text-emerald-600 duration-1000 ' to="/dashboard"  >Dashboard</Link>
          </li>
          <li onClick={handleClose} className='hover:scale-110 font-semibold duration-1000 text-xl'>
            <button 
             onClick={onLogout}
            >
              Logout
            </button>
          </li>
        </>) 
        :
        (<>
          <li className='hover:scale-110 font-semibold duration-1000 text-xl'>
            <Link onClick={handleClose} className='hover:text-emerald-600 duration-1000 ' to="/login"  >Login</Link>
          </li>
          <li className='hover:scale-110 font-semibold duration-1000 text-xl'>
            <Link onClick={handleClose} className='hover:text-emerald-600 duration-1000 ' to="/register"  >Register</Link>
          </li>
        </>)}
      </ul>
    </div>
  );
};

export default Navbar;