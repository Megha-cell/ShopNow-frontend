import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { secureFetch } from "../utils/secureFetch";
import { toast } from "react-toastify";
function AddProduct() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "",
  });

  const [categories, setCategories] = useState([]);
  //const [message, setMessage] = useState("");

  useEffect(() => {
    // Check for admin role
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    }

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await secureFetch(`${apiUrl}/api/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.log("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await secureFetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        //setMessage("Product added successfully");
        toast.success("Product added successfully")
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
          imageUrl: "",
        });
      } else {
        //setMessage(data.message || "Something went wrong");
        toast.error(data.message || "Something went wrong")
      }
    } catch (err) {
      //setMessage("Error creating product");
      toast.error("Error creating product")
    }
  };

  return (
    <div className="container mt-4">
      
      {/* {message && <div className="alert alert-info">{message}</div>} */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="form-control mb-2"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-2"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="form-control mb-2"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="form-control mb-2"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          className="form-control mb-2"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          className="form-control mb-3"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        <button className="btn btn-success" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
