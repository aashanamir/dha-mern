import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import TopNavbar from "./TopNavbar";
import Filters from "./Filters";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get current path

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <TopNavbar />
      <div className={styles.navbar}>
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logo}>dha</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className={styles.menuIcon} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop & Mobile Menu */}
        <div className={`${styles.menu} ${isMobileMenuOpen ? styles.active : ""}`}>
          <Link to="/mybayut" className={`${styles.myBayut} ${location.pathname === "/mybayut" ? styles.active : ""}`}>
            my<span className={styles.highlight}>dha</span>
          </Link>
          <Link to="/agents" className={location.pathname === "/agents" ? styles.active : ""}>Find my Agent</Link>
          <Link to="/floor-plans" className={location.pathname === "/floor-plans" ? styles.active : ""}>Floor Plans</Link>
          <Link to="/guides" className={location.pathname === "/guides" ? styles.active : ""}>Guides <FaChevronDown /></Link>
          <Link to="/market-intelligence" className={location.pathname === "/market-intelligence" ? styles.active : ""}>Market Intelligence <FaChevronDown /></Link>
          <Link to="/agent-portal" className={location.pathname === "/agent-portal" ? styles.active : ""}>Agent Portal</Link>
          <Link to="/events" className={location.pathname === "/events" ? styles.active : ""}>Events <FaChevronDown /></Link>
        </div>
      </div>
      <Filters />
    </>
  );
};

export default Navbar;