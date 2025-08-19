import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../Styles/Footer.module.css";

const Footer = () => {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          {/* About Us Section */}
          <div className={styles.footerSection}>
            <h4>About Us</h4>
            <p>
              We provide high-quality projects and resources to help developers
              learn and grow. Join us to explore amazing opportunities!
            </p>
          </div>
  
          {/* Quick Links Section */}
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link className={styles.quickLink} to="/">Home</Link></li>
              <li><Link className={styles.quickLink} to='/projects'>Projects</Link></li>
              <li><Link className={styles.quickLink} to='/about'>About</Link></li>
              <li><Link className={styles.quickLink} to="/contact">Contact</Link></li>
            </ul>
          </div>
  
          {/* Follow Us Section */}
          <div className={styles.footerSection}>
            <h4>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
  
        {/* Footer Bottom Section */}
        <div className={styles.footerBottom}>
          <p>© 2024 projectHub. All rights reserved.</p>
        </div>
      </footer>
    );
};
  
export default Footer;
  