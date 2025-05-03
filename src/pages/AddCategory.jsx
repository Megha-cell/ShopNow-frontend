import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { secureFetch } from "../utils/secureFetch";
import { toast } from "react-toastify";

function AddCategory() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  //const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      fetchCategories();
    }
  }, [navigate]);

  const fetchCategories = async () => {
    try {
      const res = await secureFetch(`${apiUrl}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await secureFetch(`${apiUrl}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (res.ok) {
        // setMessage("✅ Category added successfully!");
        toast.success("Category added successfully!")
        setName("");
        fetchCategories(); // Refresh list
      } else {
        // setMessage(data.message || "❌ Failed to add category.");
        toast.error(data.message || " Failed to add category.")
      }
    } catch (error) {
      console.error("Add category error:", error);
      setMessage("⚠️ Server error. Please try again later.");
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const res = await secureFetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        // setMessage("🗑️ Category deleted successfully!");
        toast.success("Category deleted successfully!")
        fetchCategories(); // Refresh list
      } else {
        // setMessage(data.message || "❌ Failed to delete category.");
        toast.error(data.message || "Failed to delete category.")
      }
    } catch (error) {
      console.error("Delete category error:", error);
      setMessage("⚠️ Error deleting category.");
    }
  };

  return (
    <div className="container mt-4">
      
      {/* {message && <div className="alert alert-info">{message}</div>} */}

      <form onSubmit={handleSubmit} className="mt-3">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success">
          Add Category
        </button>
      </form>

      <hr />
      <h4 className="mt-4">Existing Categories</h4>
      <ul className="list-group">
        {categories.map((cat) => (
          <li key={cat._id} className="list-group-item d-flex justify-content-between align-items-center">
            {cat.name}
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cat._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddCategory;
