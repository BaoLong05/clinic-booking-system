import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../utils/helper";
import "./Orders.css";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders();
      if (res.success) {
        setOrders(res.data || []);
        setError(null);
      } else {
        setError(res.message || "Không thể tải danh sách đơn hàng");
      }
    } catch (err) {
      setError("Lỗi kết nối: " + err.message);
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= FORMAT PRICE =================
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(price) || 0);
  };

  // ================= FORMAT DATE =================
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ================= GET STATUS LABEL =================
  const getStatusLabel = (status) => {
    const statusMap = {
      pending: "Chờ xử lý",
      processing: "Đang xử lý",
      shipped: "Đã gửi",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
    };
    return statusMap[status] || status;
  };

  // ================= GET STATUS CLASS =================
  const getStatusClass = (status) => {
    const classMap = {
      pending: "status-pending",
      processing: "status-processing",
      shipped: "status-shipped",
      completed: "status-completed",
      cancelled: "status-cancelled",
    };
    return classMap[status] || "";
  };

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải danh sách đơn hàng...</p>
        </div>
      </div>
    );
  }

  // ================= RENDER =================
  return (
    <div className="orders-container">
      <div className="orders-wrapper">
        <h1 className="orders-title">ĐƠN HÀNG CỦA TÔI</h1>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Đóng</button>
          </div>
        )}

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>Bạn chưa có đơn hàng nào</h2>
            <p>Hãy bắt đầu mua sắm để tạo đơn hàng đầu tiên của bạn</p>
            <button className="btn btn-primary" onClick={() => navigate("/products")}>
              QUAY LẠI Mua SẮM
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Mã đơn hàng: <span className="order-id">#{order.id}</span></h3>
                    <p className="order-date">{formatDate(order.created_at)}</p>
                  </div>
                  <div className={`order-status ${getStatusClass(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </div>
                </div>

                <div className="order-items-section">
                  <h4>Sản phẩm</h4>
                  <div className="order-items">
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="order-item">
                        <div className="item-info">
                          <p className="item-name">{item.product?.name}</p>
                          <p className="item-details">
                            Số lượng: {item.quantity} | Giá: {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="item-total">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-footer">
                  <div className="order-details">
                    <div className="detail-row">
                      <span className="label">Địa chỉ giao hàng:</span>
                      <span className="value">{order.shipping_address}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Số điện thoại:</span>
                      <span className="value">{order.phone}</span>
                    </div>
                  </div>
                  <div className="order-total-section">
                    <span className="label">Tổng cộng:</span>
                    <span className="total-price">{formatPrice(order.total_price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
