import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import secureFetch from "../utils/secureFetch";
import { toast } from "react-toastify";
function EditProduct() {
  const { id } = useParams();
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
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      fetchProduct();
      fetchCategories();
    }
  }, [navigate, id]);

  const fetchProduct = async () => {
    try {
      const res = await secureFetch(`${apiUrl}/api/products/${id}`);
      const data = await res.json();
      if (res.ok) {
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category: data.category,
          imageUrl: data.imageUrl,
        });
      } else {
        //setMessage("Product not found");
        toast.error("Product not found")
      }
    } catch (err) {
      //setMessage("Error fetching product");
      toast.error("Error fetching product")
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await secureFetch(`${apiUrl}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await secureFetch(`${apiUrl}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        // setMessage("Product updated successfully");
        toast.success("Product updated successfully")
      } else {
        // setMessage(data.message || "Update failed");
        toast.error(data.message || "Update failed")
      }
    } catch (err) {
      // setMessage("Error updating product");
      toast.error("Error updating product")
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
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
        <button className="btn btn-primary" type="submit">
          Update Product
        </button>
        <button
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/admin/manage-products")}
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
