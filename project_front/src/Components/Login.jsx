import React, {useContext, useState} from 'react';
import api from "../api";
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/Login.module.css";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import {Typewriter} from 'react-simple-typewriter';
import Loading from './Loading';

function Login() {

  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [success, setSuccess]=useState("");
  const [error, setError]=useState("");
  const [minimumLoadingTime]=useState(2000);
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();
  const {login}=useContext(AuthContext);


  const handleLogin=async(e)=>{
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    const startTime=Date.now();

    try{
      const response=await api.post("accounts/token/", {
        email,
        password
      });
      const requestTime=Date.now()-startTime;
    
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      localStorage.setItem("email", email);

      const waitTime=Math.max(minimumLoadingTime-requestTime, 0);
      setSuccess("Logged in Succesfully");
      setTimeout(()=>{

        login();
        navigate("/");
      }, waitTime, login);


    }catch(err){
      setError("Login Failed. Please check your credentials ")
    }finally{
      setLoading(false);
    }

  }
  return (
    <>
    <div className={styles.header}>
      <h2 className={styles.childHeader}>
      <Typewriter
      words={["Welcome Back!","Log in to continue your journey!"]}
      cursor
      cursorStyle="|"
      typeSpeed={100}
      deleteSpeed={50}
      delaySpeed={1000}
      />
      </h2>
    </div>
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input 
          className={styles.input}
          type="email"
          placeholder='Email Address'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required />

          <input 
          className={styles.input}
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          />

          <button style={{backgroundColor: loading ? 'transparent' : 'blue'}} className={styles.button} type='submit'>
            {loading ?(<div className={styles.spinnerContainer}> <Loading/> </div>):("Login") }
          </button>
          <p className={styles.type} onClick={()=>navigate("/forgot")}>Forgot Password?</p>
          <p className={styles.type} onClick={()=>navigate("/register")}>Don't have an account?</p>
        </form>

        {success && <p style={{color:"green"}}>{success}</p>}
        {error && <p style={{color:"red"}}>{error}</p>}
      </div>  
    </div>
    </>
  )
}

export default Login;
