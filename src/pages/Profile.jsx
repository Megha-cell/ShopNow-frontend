import { useEffect, useState } from "react";
import secureAxios from "../utils/secureAxios";
import { toast } from "react-toastify";


function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  //const [message, setMessage] = useState("");

  // Get token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await secureAxios.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({ name: data.name, email: data.email, password: "" });
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await secureAxios.put("/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setMessage("Profile updated successfully!");
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      // setMessage("Something went wrong.");
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="container mt-5">
      
      {/* {message && <p>{message}</p>} */}
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="mb-3">
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            type="text"
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            type="email"
          />
        </div>
        <div className="mb-3">
          <label>New Password (optional)</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            type="password"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
