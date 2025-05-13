import React from "react";
import styles from "./Footer.module.css";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <nav className={styles.navLinks}>
            <a href="#">ABOUT US</a> | <a href="#">CAREERS</a> | <a href="#">CONTACT US</a>
          </nav>
          <p className={styles.terms}>TERMS & PRIVACY POLICY</p>
          <div className={styles.country}>
            <span>COUNTRY:</span>
            <img src="https://flagcdn.com/w40/ae.png" alt="UAE Flag" className={styles.flag} />
            <span>United Arab Emirates ▼</span>
          </div>
          <p className={styles.copyright}>© 2008 - 2025 Bayut.com</p>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          {/* Social Media */}
          <div className={styles.socialIcons}>
            <FaFacebookF />
            <FaXTwitter />
            <FaLinkedinIn />
            <FaInstagram />
            <FaYoutube />
          </div>

          {/* App Store Buttons */}
          <div className={styles.appButtons}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/200px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;