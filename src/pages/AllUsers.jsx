// src/pages/AllUsers.js

import React, { useEffect, useState } from "react";
import secureAxios from "../utils/secureAxios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // or however you store it
      const res = await secureAxios.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
           
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
