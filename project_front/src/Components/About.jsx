import React from "react";
import styles from "../Styles/About.module.css";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate=useNavigate();
  return (
    <div className={styles.aboutPage}>
      <button onClick={()=>navigate("/")} className={styles.aboutBackButton}>⬅</button>
      <h1>About Us</h1>

      <div className={styles.section}>
        <div className={styles.text}>
          <h2>Project Vision</h2>
          <p>
            ProjectHub is designed to provide a centralized platform where users can efficiently manage,
             showcase, and collaborate on their projects. The goal is to create an intuitive, scalable, 
             and secure environment that allows users to organize project details, share resources, and
              track progress, all while promoting effective team collaboration. Additionally,
               the platform will facilitate real-time query-solving between developers through video calls,
                enabling direct communication and seamless resolution of technical issues, enhancing productivity
                 and collaboration.
          </p>
        </div>
        <div className={styles.image}>
          <img
            src="pictures/vision.jpg"
            alt="Team Vision"
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.image}>
          <img
            src="pictures/approach.jpg"
            alt="Team Approach"
          />
        </div>
        <div className={styles.text}>
          <h2>Our Approach</h2>
          <p>
          The approach focuses on creating a user-friendly experience with flexibility, 
          scalability, and security in mind. Users can manage and showcase their projects, 
          collaborate through integrated tools, and track milestones. The platform will be developed 
          using Django for backend services, React for a dynamic frontend, 
          ensuring that it can scale as project data and team collaboration needs grow.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.text}>
          <h2>Development Process</h2>
          <p>
          The process begins with detailed planning to define the platform’s key features and user needs,
           followed by prototyping and designing the interface. The backend will be built with Django for 
           a solid API, and React will power the frontend for a smooth user experience. After development, the platform will undergo
            rigorous testing, with continuous feedback and iteration to optimize user experience and 
            functionality over time.
          </p>
        </div>
        <div className={styles.image}>
          <img
            src="pictures/process.jpg"
            alt="Development Process"
          />
        </div>
      </div>

      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default About;
