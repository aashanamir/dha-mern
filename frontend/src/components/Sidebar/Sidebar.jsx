import React from "react";
import styles from "./Sidebar.module.css";
import AlertButton from "../AlertButton/AlertButton";
import SidebarList from "../SidebarList/SidebarList";

const Sidebar = () => {
  const searches = [
    "1 Bedroom Properties for sale in UAE",
    "2 Bedroom Properties for sale in UAE",
    "3 Bedroom Properties for sale in UAE",
    "4 Bedroom Properties for sale in UAE",
    "5 Bedroom Properties for sale in UAE",
    "Luxury Villas in Dubai",
  ];
  return (
    <aside className={styles.sidebar}>
      <div className={styles.imageContainer}>
        <img src="/assets/images/property-1.jpeg" alt="" />
      </div>
      <AlertButton />
      {/* Recommended Searches */}
        <SidebarList searches={searches} />
        <SidebarList searches={searches} />
    </aside>
  );
};

export default Sidebar;