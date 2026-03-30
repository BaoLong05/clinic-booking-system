import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = ({ isOpen, onClose, isMobile }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: "📊"
    },
    {
      path: "/admin/products",
      label: "Sản phẩm",
      icon: "📦"
    },
    {
      path: "/admin/categories",
      label: "Danh mục",
      icon: "📂"
    },
    {
      path: "/admin/orders",
      label: "Đơn hàng",
      icon: "🛒"
    },
    {
      path: "/admin/users",
      label: "Người dùng",
      icon: "👥"
    }
  ];

  return (
    <>
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
      <aside className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-logo">
          <h2>
            <span className="gold">LUXURY</span>
          </h2>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => isMobile && onClose()}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button 
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
          >
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Đăng xuất</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
