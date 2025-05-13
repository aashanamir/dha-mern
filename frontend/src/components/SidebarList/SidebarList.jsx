import React, { useState } from "react";
import styles from "./SidebarList.module.css";

const SidebarList = ({ searches }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const showMore = () => {
    setVisibleCount(searches.length);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Recommended searches</div>
      <ul className={styles.list}>
        {searches.slice(0, visibleCount).map((item, index) => (
          <li key={index} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
      {visibleCount < searches.length && (
        <button className={styles.viewMore} onClick={showMore}>
          View More
        </button>
      )}
    </div>
  );
};

export default SidebarList;