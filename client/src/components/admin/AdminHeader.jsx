import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHeader.css";

const AdminHeader = ({ toggleSidebar, isSidebarOpen }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <button 
          className="sidebar-toggle"
          onClick={toggleSidebar}
          title={isSidebarOpen ? "Ẩn sidebar" : "Hiện sidebar"}
        >
          ☰
        </button>
      </div>

      <div className="header-right">
        <div className="user-info">
          <span className="user-avatar">👤</span>
          <div className="user-details">
            <p className="user-name">{user?.name || "Admin"}</p>
            <p className="user-role">Quản trị viên</p>
          </div>
        </div>

        <button 
          className="logout-btn-header"
          onClick={handleLogout}
          title="Đăng xuất"
        >
          🚪
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
