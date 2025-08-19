import React, { useState } from 'react';
import api from "../api";
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/Query.module.css";

function Query() {
    const [project_name, setProjectName]=useState("");
    const [query_info, setQueryInfo]=useState("");
    const [email, setEmail]=useState("");
    const [success, setSuccess]=useState(null);
    const [error, setError]=useState(null);
    const navigate=useNavigate();
    const [formSubmitted, setFormSubmitted]=useState(false);


    const handleQuery=async(e)=>{
        e.preventDefault();
        setFormSubmitted(true);
        setSuccess(null);
        setError(null);

        try{
            const response=await api.post("query/raise/",{
                project_name,
                query_info,
                email
            })
            setSuccess("Query Raised!");
            setTimeout(() => {
                navigate("/projectuploadlist");
            }, 5000);
        }catch(error){
            setError(error);
            navigate("/query")
        }
    }
  return (
    <div className={styles.queryC}>
        <div className={styles.queryContainer}>
            <div className={styles.heading}>Ask Your Developers</div>
            <form className={styles.form} onSubmit={handleQuery}>
                <input 
                    type="text"
                    placeholder='Project name'
                    value={project_name}
                    onChange={(e)=>setProjectName(e.target.value)}
                    className={styles.input}
                    required 
                />
                <textarea
                    placeholder='Share your problem briefly'
                    value={query_info}
                    onChange={(e)=>setQueryInfo(e.target.value)}
                    className={styles.input}
                    required
                />
                <input 
                    type="email"
                    placeholder='Your email address'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className={styles.input}
                    required
                />
                <button className={styles.button} type="submit">Submit</button>
            </form>
                {formSubmitted && (
                    <p className={styles.textMessage}>A developer will contact you within 2 hours on the provided email.</p>
                )}
        </div>
    </div>
  )
}

export default Query;
