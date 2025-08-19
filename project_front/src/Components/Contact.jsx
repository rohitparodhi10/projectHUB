import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import styles from "../Styles/Contact.module.css";
import Footer from './Footer';

export default function Contact() {
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [message, setMessage]=useState("");
    const [success, setSuccess]=useState(false);
    const [error, setError]=useState(false);
    const [loading, setLoading]=useState(false);
    const [minimumLoadingTime]=useState(2000);
    const navigate=useNavigate();

    
    const handleContact=async(e)=>{
        e.preventDefault();
        setError("")
        setSuccess("");
        setLoading(true);

        const startTime=Date.now()

        try{
            const response=await api.post("feedback/contact/",{
                name,
                email,
                message,
            }
            )
            const requestTime=Date.now() -startTime;
            const waitTime=Math.max(minimumLoadingTime-requestTime,0);
            setSuccess("Sent Succesfully!");

            setTimeout(()=>{
                navigate("/");
            },waitTime);

        }catch(err){
            setError(err);
        }finally{
            setLoading(false);
        }

    }
    

  return (
    <>
        <button className={styles.buttonContact} onClick={()=>navigate('/')}>⬅</button>
        <div className={styles.contactContainer}>
                <h1>Contact Us</h1>
                <p className={styles.para}>The customer is very important, the customer will be followed by the customer. <br />But at the same time they happened with great labor and pain.</p>

                <form onSubmit={handleContact}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={styles.input}
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />

                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className={styles.input}
                    ></textarea>

                    <button type="submit" className={styles.button}>
                        {loading ? <Loading /> : "Submit"}
                    </button>

                    {success && <p>{success}</p>}
                    {error && <p>{error}</p>}

                </form>


                <iframe
                    className={styles.map}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.809214842452!2d73.84778481510433!3d18.5204306874147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07a1e3b2dfd%3A0x8c232cfbc1a014a4!2sPune%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1672345678901!5m2!1sen!2sin"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
    

                <div >
                    <Footer/>
                </div>
        </div>
    </>    
    )
}
