import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Header } from './components';
import Footer from './components/Footer/Footer.jsx';
import './App.css'
// import { store } from './store/store.js';
import { Outlet, BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [loading, setLoading]=useState(true);
  const dispatch=useDispatch();
  
    
    useEffect(()=>{
      authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login(userData))
        }
        else{
          dispatch(logout())
        }
      })
      .finally(()=>setLoading(false));
    },[])
  return !loading?(
   <div>
    <Header/>
    <Outlet/>
    <Footer/>
   </div>
  ) : (null)
}

export default App
