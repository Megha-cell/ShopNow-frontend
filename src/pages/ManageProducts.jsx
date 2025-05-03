import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { secureFetch } from "../utils/secureFetch";
import { toast } from "react-toastify";
function ManageProducts() {
  const [products, setProducts] = useState([]);
  //const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await secureFetch(`${apiUrl}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
      //setMessage("Failed to load products");
      toast.error("Failed to load products")
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await secureFetch(`${apiUrl}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        //setMessage("Product deleted successfully");
        toast.success("Product deleted successfully")
        fetchProducts(); // Refresh list
      } else {
        //setMessage(data.message || "Failed to delete product");
        toast.error(data.message || "Failed to delete product")
      }
    } catch (err) {
      //setMessage("Error deleting product");
      toast.error("Error deleting product")
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  return (
    <div className="container mt-4">
      
      {/* {message && <div className="alert alert-info">{message}</div>} */}
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProducts;
 