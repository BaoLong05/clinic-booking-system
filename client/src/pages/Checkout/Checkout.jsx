import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, createOrder } from "../../utils/helper";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    shipping_address: '',
    phone: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // ================= FETCH CART =================
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart();
      if (res.success && res.data?.items?.length > 0) {
        setCart(res.data);
        setError(null);
      } else {
        setError("Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
        setCart(null);
      }
    } catch (err) {
      setError("Lỗi kết nối: " + err.message);
      console.error("Fetch cart error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ================= FORMAT PRICE =================
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(price) || 0);
  };

  // ================= CALCULATE TOTAL =================
  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  // ================= GET PRODUCT IMAGE =================
  const getProductImage = (product) => {
    const images = product?.images || [];
    if (images.length > 0 && images[0]?.image_url) {
      return images[0].image_url;
    }
    return "/no-image.png";
  };

  // ================= HANDLE INPUT CHANGE =================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.shipping_address.trim()) {
      setError("Vui lòng nhập địa chỉ giao hàng");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Vui lòng nhập số điện thoại");
      return;
    }

    setSubmitting(true);
    try {
      const res = await createOrder(formData);
      if (res.success) {
        alert("Đặt hàng thành công! Mã đơn hàng: " + res.data.id);
        navigate("/orders");
      } else {
        setError(res.message || "Không thể đặt hàng");
      }
    } catch (err) {
      setError("Lỗi khi đặt hàng: " + err.message);
      console.error("Checkout error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <div className="checkout-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải thông tin giỏ hàng...</p>
        </div>
      </div>
    );
  }

  // ================= EMPTY CART STATE =================
  if (!cart || cart.items.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-cart">
          <h2>Giỏ hàng trống</h2>
          <p>Vui lòng thêm sản phẩm trước khi thanh toán.</p>
          <button className="btn btn-primary" onClick={() => navigate("/products")}>
            QUAY LẠI MUA SẮM
          </button>
        </div>
      </div>
    );
  }

  // ================= RENDER =================
  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <h1 className="checkout-title">XÁC NHẬN ĐẶT HÀNG</h1>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Đóng</button>
          </div>
        )}

        <div className="checkout-content">
          {/* LEFT COLUMN - ORDER SUMMARY */}
          <div className="checkout-left">
            <div className="order-summary">
              <h2>Tóm tắt đơn hàng</h2>
              <div className="order-items">
                {cart.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img src={getProductImage(item.product)} alt={item.product.name} />
                    </div>
                    <div className="item-details">
                      <h4>{item.product.name}</h4>
                      <p className="item-sku">SKU: {item.product.id}</p>
                      <p className="item-price">{formatPrice(item.product.price)}</p>
                      <p className="item-quantity">Số lượng: {item.quantity}</p>
                    </div>
                    <div className="item-total">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-breakdown">
                <div className="breakdown-row">
                  <span>Tổng giá trị sản phẩm:</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
                <div className="breakdown-row">
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                <div className="breakdown-row total">
                  <span>Tổng cộng:</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - CHECKOUT FORM */}
          <div className="checkout-right">
            <form onSubmit={handleSubmit} className="checkout-form">
              <h2>Thông tin giao hàng</h2>

              <div className="form-group">
                <label htmlFor="shipping_address">Địa chỉ giao hàng *</label>
                <textarea
                  id="shipping_address"
                  name="shipping_address"
                  value={formData.shipping_address}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: 123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh"
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Số điện thoại *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0987654321"
                  pattern="[0-9]{10,11}"
                  required
                />
                <small>Nhập số điện thoại 10-11 ký tự</small>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => navigate("/cart")}
                  disabled={submitting}
                >
                  QUAY LẠI
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={submitting}
                >
                  {submitting ? "ĐANG XỬ LÝ..." : "XÁC NHẬN ĐẶT HÀNG"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
