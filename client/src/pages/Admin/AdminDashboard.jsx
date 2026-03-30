import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminCharts from "../../components/admin/AdminCharts";
import { 
  getDashboardStats, 
  getRecentOrders, 
  getTopProducts,
  BASE_URL 
} from "../../utils/adminHelper";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
    lowStock: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all dashboard data in parallel
      const [statsRes, ordersRes, productsRes] = await Promise.all([
        getDashboardStats(),
        getRecentOrders(),
        getTopProducts()
      ]);

      if (statsRes.success) {
        setStats(statsRes.data);
      }
      
      if (ordersRes.success) {
        setRecentOrders(ordersRes.data);
      }
      
      if (productsRes.success) {
        setTopProducts(productsRes.data);
      }
      
      setError(null);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Không thể tải dữ liệu dashboard");
      toast.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <span className="error-icon">⚠️</span>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchDashboardData}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Tổng quan</h1>
        <p className="dashboard-subtitle">Chào mừng trở lại, Admin!</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-info">
            <h3>Doanh thu</h3>
            <p className="stat-value">{formatPrice(stats.totalRevenue)}</p>
            <span className="stat-change positive">+12.5%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">📦</div>
          <div className="stat-info">
            <h3>Đơn hàng</h3>
            <p className="stat-value">{stats.totalOrders}</p>
            <span className="stat-sub">Đang xử lý: {stats.pendingOrders}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products">💎</div>
          <div className="stat-info">
            <h3>Sản phẩm</h3>
            <p className="stat-value">{stats.totalProducts}</p>
            <span className="stat-sub warning">Sắp hết: {stats.lowStock}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon users">👥</div>
          <div className="stat-info">
            <h3>Khách hàng</h3>
            <p className="stat-value">{stats.totalUsers}</p>
            <span className="stat-change positive">+8.2%</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <AdminCharts />
      </div>

      {/* Recent Orders & Top Products */}
      <div className="dashboard-grid">
        {/* Recent Orders */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Đơn hàng gần đây</h3>
            <a href="/admin/orders" className="view-all">Xem tất cả →</a>
          </div>
          <div className="card-content">
            {recentOrders.length === 0 ? (
              <p className="empty-text">Chưa có đơn hàng nào</p>
            ) : (
              <div className="recent-orders-list">
                {recentOrders.map((order) => (
                  <div key={order.id} className="order-item">
                    <div className="order-info">
                      <span className="order-id">#{order.id}</span>
                      <span className="order-customer">{order.customer_name}</span>
                    </div>
                    <div className="order-details">
                      <span className="order-amount">{formatPrice(order.total)}</span>
                      <span className={`order-status ${order.status}`}>
                        {order.status === 'pending' && 'Chờ xử lý'}
                        {order.status === 'processing' && 'Đang xử lý'}
                        {order.status === 'completed' && 'Hoàn thành'}
                        {order.status === 'cancelled' && 'Đã hủy'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Sản phẩm bán chạy</h3>
            <a href="/admin/products" className="view-all">Xem tất cả →</a>
          </div>
          <div className="card-content">
            {topProducts.length === 0 ? (
              <p className="empty-text">Chưa có dữ liệu</p>
            ) : (
              <div className="top-products-list">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="product-item">
                    <span className="product-rank">{index + 1}</span>
                    <div className="product-image">
                      <img 
                        src={product.image || "/no-image.png"} 
                        alt={product.name}
                        onError={(e) => e.target.src = "/no-image.png"}
                      />
                    </div>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p>{product.sold_count} đã bán</p>
                    </div>
                    <span className="product-revenue">{formatPrice(product.revenue)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;