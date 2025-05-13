import React from "react";
import styles from "./AlertButton.module.css";
import { FaBell } from "react-icons/fa";

const AlertButton = () => {
  return (
    <div className={styles.alertBox}>
      <p className={styles.alertText}>
        Be the first to hear about new properties
      </p>
      <button className={styles.alertButton}>
        <FaBell className={styles.bellIcon} /> ALERT ME OF NEW PROPERTIES
      </button>
    </div>
  );
};

export default AlertButton;