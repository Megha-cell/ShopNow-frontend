import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate



function AdminDashboard() {
    const navigate = useNavigate();
  return (
    <div className="container mt-4">
      
      <p>Welcome, Admin! You can manage categories and products here.</p>

      <div className="row mt-4">
        <div className="col-md-4">
          <button className="btn btn-primary w-100" onClick={() =>navigate("/admin/add-category")}>
            Manage Categories
          </button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100" onClick={() => navigate("/admin/add-product")}>
            Add Product
          </button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100" onClick={() =>navigate("/admin/manage-products")}>
            Manage Products
          </button>
        </div>
        <div className="col-md-4 mt-4">
          <button className="btn btn-primary w-100" onClick={() =>navigate("/admin/all-users")}>
            View all Users
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
