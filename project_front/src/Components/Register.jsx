import React,{useState, useEffect} from 'react';
import api from '../api';
import styles from "../Styles/Register.module.css";
import { Navigate, useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import Loading from './Loading';

function Register() {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [user_image, setImage]=useState(null);
    const [success, setSuccess]=useState(false);
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(false);
    const [minimumLoadingTime]=useState(2000);
    const navigate=useNavigate();

    const startTime=Date.now();

    const handleImageChange=(e)=>{
        setImage(e.target.files[0]);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setSuccess(true);
        setError(false);
        setLoading(true);

        const formData=new FormData();
        formData.append("email", email);
        formData.append("password", password);
        if (user_image) {
            formData.append("user_image", user_image);
        }

        try{
            const response=await api.post("accounts/register/", formData
            );
            const requestTime=Date.now()-startTime;
            const waitTime=Math.max(minimumLoadingTime-requestTime,0)
            setSuccess("Registered Succesfully!");
            setTimeout(()=>{
                navigate('/login')
            }, waitTime);
            
        }catch(err){
            setError(true);
            alert("Registration Failed:", + (err.response?.data?.detail || err.message));
        }finally{
            setLoading(false);
        }
    };

  return (
    <>
    <div className={styles.header}>
          <h2 className={styles.childHeader}>
          <Typewriter
          words={["Join us!","Create an account to unlock personalized resource!"]}
          cursor
          cursorStyle="|"
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={1000}
          />
          </h2>
    </div>
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    style={{width:"90%", color:"white", marginBottom:"1rem"}}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button style={{backgroundColor: loading ? "transparent" : "blue"}} className={styles.button} type="submit">
                    {loading ? (
                        <div className={styles.spinnerContainer}>
                            <Loading/>
                        </div>
                    ):(
                        "Register"
                    )}
                    </button>
                <p className={styles.type} onClick={()=>navigate('/login')}>Already have an account!</p>
            </form>

            {success && <p className={styles.success}>Registred Succesfully!</p>}
            {error && <p className={styles.error}>Registration Failed. Please try again</p>}
        </div>
    </div>
    </>
  )
}

export default Register;
