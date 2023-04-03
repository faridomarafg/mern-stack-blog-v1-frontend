import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';
import Dashoboard from './pages/Dashoboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './features/auth/authSlice';
import EditPost from './pages/EditPost';
import SinglePost from './pages/SinglePost';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ToastContainer/>
      <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<Home/>}/>
        <Route path='/api/posts/search' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashoboard/>}/>
        <Route path='/createpost' element={<CreatePost/>}/>
        <Route path='/editPost/:id' element={<EditPost/>}/>
        <Route path='/post/:id' element={<SinglePost/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
