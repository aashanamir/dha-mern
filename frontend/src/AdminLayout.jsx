import AdminSidebar from "./admin/components/sidebar/AdminSidebar.jsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px", minHeight: "100vh" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
