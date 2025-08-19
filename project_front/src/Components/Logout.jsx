import React,{useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../constants';

export default function Logout() {
    const navigate=useNavigate();
    const {logout}=useContext(AuthContext);

    useEffect(()=>{
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem("email");
        logout();
        navigate('/login');
    },[navigate, logout]);
  return (
    <div>
        <h1>you have been logged out</h1>
    </div>
  )
}
