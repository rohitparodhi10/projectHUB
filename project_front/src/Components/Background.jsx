import React,{useEffect} from 'react';
import { useLocation } from 'react-router-dom';


function Background() {
    const location=useLocation();

    useEffect(()=>{
        switch(location.pathname){
            case "/":
                document.body.style.backgroundImage="url(/static/pictures/home.jpg)";
                document.body.style.backgroundColor="black";
                document.body.style.backgroundSize="cover";
                document.body.style.backgroundRepeat="no-repeat";
                document.body.style.width="100%";
                document.body.style.height="100vh";
                break;

            case "/login":
                document.body.style.backgroundImage="url(/static/pictures/login.jpg)";
                document.body.style.backgroundSize="cover";
                document.body.style.backgroundRepeat="no-repeat";
                break;
            
            case "/register":
                document.body.style.backgroundImage="url(/static/pictures/login.jpg)";
                document.body.style.backgroundSize="cover";
                document.body.style.backgroundRepeat="no-repeat";
                break;
            
            case "/forgot":
                document.body.style.backgroundImage="url(/static/pictures/forgot.jpg)";
                document.body.style.backgroundSize="cover";
                document.body.style.backgroundPosition="no-repeat";
                break;

            case "/loading":
                document.body.style.backgroundColor="black";
                break;  
            
            case "/query":
                document.body.style.backgroundImage="url(/static/pictures/query.jpg)";
                document.body.style.backgroundSize="cover";
                document.body.style.backgroundPosition="no-repeat";
                break;
            
            case "/projects":
                document.body.style.backgroundColor="black";
                document.body.style.backgroundRepeat="no-repeat";
                document.body.style.backgroundSize="cover";
                break;
            
            case "/account":
                document.body.style.backgroundColor="black";
                break;

            case "/projectupload":
                document.body.style.backgroundImage="url(/static/pictures/projectupload.jpg)";
                document.body.style.backgroundRepeat="no-repeat";
                document.body.style.backgroundSize="cover";
                break;
            
            case "/projectuploadlist":
                document.body.style.backgroundColor="black";
                break;
            
            case "/contact":
                document.body.style.backgroundColor="black";
                break;

            case "/about":
                document.body.style.backgroundColor="black";
                break;
                    
            case "/homer":
                document.body.style.backgroundColor="black";    
                break;
            case "/trending":
                document.body.style.background="transparent";
                break;    
                
            default:
                document.body.style.background="none";        
        }

        return ()=>{
            document.body.style.background='none';
        };
    }, [location]);

  return null;
}

export default Background;
