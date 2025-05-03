// src/utils/secureAxios.js
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// Axios instance banate hain
const secureAxios = axios.create({
  baseURL: `${apiUrl}/api`, // API base URL
});

// Request interceptor
secureAxios.interceptors.request.use(
  (config) => {
    // Local storage se token nikaalna
    const token = localStorage.getItem("token");

    if (token) {
      // Agar token ho, toh header me Authorization add karna
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Request ko continue karna
  },
  (error) => {
    return Promise.reject(error); // Agar koi error ho toh reject karna
  }
);

// Response interceptor
secureAxios.interceptors.response.use(
  (res) => res, // Agar response theek hai toh return karna
  (err) => {
    // Agar error 401 aata hai (Unauthorized), toh token remove kar dena aur login page pe redirect kar dena
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Login page pe redirect karna
    }
    return Promise.reject(err); // Error ko reject karna
  }
);

export default secureAxios;
