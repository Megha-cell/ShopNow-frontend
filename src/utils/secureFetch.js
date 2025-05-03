// src/utils/secureFetch.js
//import { useNavigate } from "react-router-dom";
export const secureFetch = async (url, options = {}) => {
  //const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
    ...options.headers,
  };

  try {
    const res = await fetch(url, { ...options, headers });

    if (res.status === 401) {
      const data = await res.json();

      if (
        data.message === "Token expired or invalid" ||
        data.message === "Not authorized,invalid token"
      ) {
        alert("Session expired. Please login to continue.");
        localStorage.clear();
        window.location.href("/login");
      }
      return null;
    }

    return res;
  } catch (err) {
    console.error("Network error:", err);
    alert("Something went wrong. Try again later.");
    return null;
  }
};
export default secureFetch;
