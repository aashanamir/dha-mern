import React from "react";
import styles from "./TopNavbar.module.css";
import { FaGlobe } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={`${styles.topBar} ${styles.container}`}>
        <div className={styles.leftSection}>
          <FaGlobe className={styles.icon} /> <span>EN</span>
        </div>
        <div className={styles.rightSection}>
          <IoMdLogIn className={styles.icon} /> <span className={styles.login}>Log in</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;