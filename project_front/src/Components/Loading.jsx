import React,{useState,useEffect} from 'react';
import {Oval} from "react-loader-spinner";
import styles from "../Styles/Loading.module.css";

function Loading() {
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },2000);
    },[]);

  return (
    <div className={styles.loadingContainer} >
       {loading ?(
         <Oval
         height={40}
         width={40}
         color='#4fa94d'
         />
       ) : (
        <div></div>
       )}
    </div>
  )
}

export default Loading;
