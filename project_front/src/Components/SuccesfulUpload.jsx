import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SuccesfulUpload() {
    const navigate=useNavigate();

    useEffect(()=>{
        const timer=setTimeout(()=>{
            navigate('/projectuploadlist');
        },5000);

        return ()=>clearTimeout(timer);
    }, [navigate]);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <lottie-player
            src="https://lottie.host/07ccea3b-d4b5-4984-830b-624d0df6e4ae/SDleGcmKLP.json"
            background="##ffffff"
            speed="1"
            style={{ width: '300px', height: '300px' }}
            loop
            autoplay
        />
    </div>
    );
}

export default SuccesfulUpload;
