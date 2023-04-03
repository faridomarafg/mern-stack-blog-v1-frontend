import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import {toast} from 'react-toastify';
import Spinner from '../components/Spinner';
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai';



const initialState = {
    email:'',
    password:''
}

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [shadowPassword, setShowPassword] = useState(false);

    const [formValue, setFormValue] = useState(initialState);

    const {email, password} = formValue;

    const {loading, error} = useSelector((state)=> state.auth);


     useEffect(()=>{
        error && toast.error(error);
     },[error])

    const onChangeHandler = (e)=>{
       const {name, value} = e.target;
       setFormValue({...formValue, [name]: value})
    };

    const togglePasswordVisibility = ()=>{
        setShowPassword(!shadowPassword);
    }

    const onSubmit = (e)=>{
        e.preventDefault();

        const userData = {
            email,
            password
        }

        dispatch(login(userData));
        navigate('/');
    }

    if(loading){
        return <Spinner/>
    }

  return (
    <div className='pt-[140px] flex flex-col justify-center w-full items-center'>
        <h1 className='py-8 text-lg md:text-3xl font-playfair font-semibold text-emerald-600'>Login</h1>
        <div className='w-full sm:w-[80%] md:w-[40%] border-2 bg-slate-400 border-slate-700 md:h-fit p-3 md:p-5 relative shadow-2xl shadow-black sm:rounded-2xl md:rounded-2xl'>
            <form 
            onSubmit={onSubmit}
            className='w-full md:py-10'>

                <input 
                type="email" 
                name="email" 
                placeholder='Email'
                value={email}
                onChange={onChangeHandler}
                className='border-2 border-slate-900 px-3 py-1 w-full rounded-xl outline-none mb-5'
                />

                <div className='relative'>
                <input 
                type={shadowPassword ? "text" : "password"}
                name='password' 
                placeholder='Password'
                autoComplete='off'
                value={password}
                onChange={onChangeHandler}
                className='border-2 border-slate-900 px-3 py-1 w-full rounded-xl outline-none mb-5'
                />
                <div onClick={togglePasswordVisibility}>
                {shadowPassword ?
                <AiFillEye size={20} className='absolute right-1 top-[8px] cursor-pointer text-slate-500'/>:
                <AiFillEyeInvisible size={20} className='absolute right-1 top-[8px] cursor-pointer text-slate-500'/>}
                </div>
                </div>

                <button className='w-full rounded-xl border-2 border-slate-900 py-1 mb-5 text-teal-600'>Login</button>
                <div className='flex items-center'>
                    <p className='font-playfair pr-5 text-slate-200'>Don't have an accound?</p>
                    <p className='font-playfair font-semibold text-sm md:text-xl text-emerald-600 hover:scale-110 duration-1000'>
                        <Link to='/register'>Register</Link>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login