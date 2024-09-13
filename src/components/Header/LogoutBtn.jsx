import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';


const LogoutBtn = () => {
    const dispatch=useDispatch();
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })

    }
  return (
    <div className='inline-block' onClick={logoutHandler}>LogoutBtn</div>
  )
}

export default LogoutBtn