import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${apiUrl}/api`; // Change this to your backend URL

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const searchProducts = async (searchTerm) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/products/search?search=${encodeURIComponent(searchTerm)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

export const placeOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    return null;
  }
};

export const fetchOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${apiUrl}/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
