import React from "react";
import "./SkeletonLoader.css";

const SkeletonBody = () => {
  return (
    <div className="skeletonLayout">
      {/* Skeleton Navbar */}
      <nav className="skeletonNavbar"></nav>

      <div className="skeletonContainer">
        
        {/* Skeleton Main Content */}
        <main className="skeletonMainContent">
          <div className="skeletonCard">
            <div className="skeletonImage"></div>
            <div className="skeletonText"></div>
            <div className="skeletonBadge"></div>
          </div>
          <div className="skeletonCard">
            <div className="skeletonImage"></div>
            <div className="skeletonText"></div>
            <div className="skeletonBadge"></div>
          </div>
          <div className="skeletonCard">
            <div className="skeletonImage"></div>
            <div className="skeletonText"></div>
            <div className="skeletonBadge"></div>
          </div>
        </main>
        {/* Skeleton Sidebar */}
        <aside className="skeletonSidebar">
          <div className="skeletonSidebarItem"></div>
          <div className="skeletonSidebarItem"></div>
          <div className="skeletonSidebarItem"></div>
          <div className="skeletonSidebarItem"></div>
        </aside>
      </div>
    </div>
  );
};

export default SkeletonBody;
