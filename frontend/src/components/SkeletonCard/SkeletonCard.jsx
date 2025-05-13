import React from "react";
import styles from "./SkeletonCard.module.css";

const SkeletonCard = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonBadge}></div>
    </div>
  );
};

export default SkeletonCard;