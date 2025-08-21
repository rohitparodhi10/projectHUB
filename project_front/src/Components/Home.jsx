import React,{useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from "../Styles/Home.module.css";
import TrendingProjects from './TrendingProjects';
import Footer from './Footer';
import { AuthContext } from './AuthContext';
import api from "../api";

function Home() {
  const navigate=useNavigate();
  const {isAuthenticated, logout}=useContext(AuthContext);
  return (
    <div className={styles.homeContainer}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <img src="/pictures/logo.png" alt="Logo" className={styles.logo} />
          </li>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/projects" className={styles.navLink}>Projects</Link>
          </li>
          <li className={styles.navItem}>
            <Link to='/account' className={styles.navLink}>Account</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
          </li>
          <li className={styles.navItem}>
            {isAuthenticated ? (
              <Link to="/logout" className={styles.navLink}>Sign Out</Link>
            ):(
              <Link to="/login" className={styles.navLink}>Sign In</Link>
            )}
          </li>
        </ul>
      </nav>

      <section className={styles.heroContainer}>
        <p className={styles.heroText}>Discover, contribute, and share your projects in a community of developers</p>
        <p className={styles.heroSubText}>A platform to learn from projects and upload your own to help others grow</p>
        <button onClick={()=>navigate("/projectupload")} className={styles.heroButton}>Contribute to the hub of projects and make it even better</button>
      </section>

      <section className={styles.trending}>
        <TrendingProjects/>
      </section>

      <div className={styles.quoteContainer}>
        <p>We aim to assist new students who are unsure where to search for projects and lack access to various platforms to gain knowledge. This platform provides them with everything they need, all in one place.</p>
      </div>

      <div>
        <Footer/>
      </div>
  </div>

  )
}

export default Home;

