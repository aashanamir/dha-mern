import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./AdminSidebar.module.css";

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className={`d-flex flex-column ${styles.sidebar}`}>
      {/* Sidebar Header */}
      <div className={`text-center ${styles.logo}`}>Admin Panel</div>

      {/* Navigation Links */}
      <Link
        to="/admin/properties"
        className={location.pathname === "/admin/properties" ? styles.active : ""}
      >
        🏠 Properties
      </Link>
      <Link
        to="/admin/category/all"
        className={location.pathname === "/admin/category/all" ? styles.active : ""}
      >
        📂 Categories
      </Link>
      <Link
        to="/admin/subcategories"
        className={location.pathname === "/admin/subcategories" ? styles.active : ""}
      >
        📂 Sub Categories
      </Link>
      <Link
        to="/admin/settings"
        className={location.pathname === "/admin/settings" ? styles.active : ""}
      >
        ⚙️ Settings
      </Link>

      {/* Logout Button */}
      <Link to="/logout" className={styles.logout}>
        🚪 Logout
      </Link>
    </div>
  );
};

export default AdminSidebar;
