import axios from "axios";

export const BASE_URL = "http://192.168.33.11:8000";
export const API_BASE_URL = `${BASE_URL}/api`;

const apiUrl = (endpoint) => `${API_BASE_URL}/${endpoint}`;

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

// Setup axios interceptor to add auth token
axios.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// ============== PRODUCTS =============
// Get all products with pagination
export const getProducts = async (params = {}) => {
  const res = await axios.get(apiUrl("products"), { params });
  return res.data;
};

// Get single product
export const getProduct = async (id) => {
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
  const res = await axios.post(apiUrl(`products/${id}/update`), formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const res = await axios.delete(apiUrl(`products/${id}`));
  return res.data;
};

// ============== CATEGORIES =============
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
