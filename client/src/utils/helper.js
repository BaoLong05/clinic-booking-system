import axios from "axios";

export const BASE_URL = "http://192.168.33.11:8000";
export const API_BASE_URL = `${BASE_URL}/api`;

export const apiUrl = (endpoint) => `${API_BASE_URL}/${endpoint}`;

axios.defaults.withCredentials = true;

// Get CSRF token from cookie
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
};

// Setup axios interceptor to add CSRF token header
axios.interceptors.request.use((config) => {
  const token = getCookie('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
});

// 1. register
export const addRegister = async (data) => {
  // lấy CSRF cookie trước
  await axios.get(`${BASE_URL}/sanctum/csrf-cookie`);
  
  const res = await axios.post(apiUrl("register"), data);
  return res.data;
};

// 2. login
export const loginUser = async (data) => {

  // lấy CSRF cookie trước
  await axios.get(`${BASE_URL}/sanctum/csrf-cookie`);

  const res = await axios.post(apiUrl("login"), data);
  return res.data;
};

// 3. lấy user
export const getUser = async () => {
  const res = await axios.get(apiUrl("user"));
  return res.data;
};

// 4. logout
export const logoutUser = async () => {
  const res = await axios.post(apiUrl("logout"));
  return res.data;
};

//Product
// 1. danh sách sản phẩm + tìm kiếm + pagination
export const getProducts = async (params = {}) => {
  const res = await axios.get(apiUrl("products"), {
    params
  });
  return res.data;
};

// 2. chi tiết sản phẩm
export const getProductById = async (id) => {
  const res = await axios.get(apiUrl(`products/${id}`));
  return res.data;
};

// 3. sản phẩm liên quan
export const getRelatedProducts = async (categoryId, excludeId) => {
  try {
    const res = await getProducts({ category_id: categoryId });
    if (res.success && res.data && res.data.data) {
      const products = res.data.data.filter(product => product.id != excludeId);
      return { success: true, data: products.slice(0, 4) };
    } else {
      return { success: false, data: [] };
    }
  } catch (error) {
    console.error("Error fetching related products:", error);
    return { success: false, data: [] };
  }
};

// ============== ADMIN PRODUCTS =============
// Get all products with pagination
export const getAdminProducts = async (params = {}) => {
  const res = await axios.get(apiUrl("products"), { params });
  return res.data;
};

// Get single product
export const getAdminProduct = async (id) => {
  const res = await axios.get(apiUrl(`products/${id}`));
  return res.data;
};

// Create product
export const createProduct = async (formData) => {
  const res = await axios.post(apiUrl("products"), formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

// Update product
export const updateProduct = async (id, formData) => {
  const res = await axios.post(apiUrl(`products/${id}`), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const res = await axios.delete(apiUrl(`products/${id}`));
  return res.data;
};

// ============== ADMIN CATEGORIES =============
// Get all categories
export const getCategories = async () => {
  const res = await axios.get(apiUrl("categories"));
  return res.data;
};

// Get single category
export const getCategory = async (id) => {
  const res = await axios.get(apiUrl(`categories/${id}`));
  return res.data;
};

// Create category
export const createCategory = async (data) => {
  const res = await axios.post(apiUrl("categories"), data);
  return res.data;
};

// Update category
export const updateCategory = async (id, data) => {
  const res = await axios.put(apiUrl(`categories/${id}`), data);
  return res.data;
};

// Delete category
export const deleteCategory = async (id) => {
  const res = await axios.delete(apiUrl(`categories/${id}`));
  return res.data;
};

// CART - Giỏ hàng
// 1. lấy giỏ hàng
export const getCart = async () => {
  const res = await axios.get(apiUrl("cart"));
  return res.data;
};

// 2. thêm sản phẩm vào giỏ hàng
export const addToCart = async (data) => {
  const res = await axios.post(apiUrl("cart/add"), data);
  return res.data;
};

// 3. cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartItem = async (itemId, quantity) => {
  const res = await axios.put(apiUrl(`cart/items/${itemId}`), { quantity });
  return res.data;
};

// 4. xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (itemId) => {
  const res = await axios.delete(apiUrl(`cart/items/${itemId}`));
  return res.data;
};

// 5. xóa toàn bộ giỏ hàng
export const clearCart = async () => {
  const res = await axios.post(apiUrl("cart/clear"));
  return res.data;
};

// ============== ORDERS - Đơn hàng =============
// 1. Tạo đơn hàng từ giỏ hàng
export const createOrder = async (data) => {
  const res = await axios.post(apiUrl("orders"), data);
  return res.data;
};

// 2. Lấy danh sách đơn hàng của user
export const getOrders = async () => {
  const res = await axios.get(apiUrl("orders"));
  return res.data;
};

// 3. Lấy chi tiết đơn hàng
export const getOrderById = async (id) => {
  const res = await axios.get(apiUrl(`orders/${id}`));
  return res.data;
};

// 4. Cập nhật trạng thái đơn hàng (admin)
export const updateOrderStatus = async (id, status) => {
  const res = await axios.put(apiUrl(`orders/${id}/status`), { status });
  return res.data;
};
