import { useEffect, useState } from "react";
import {secureFetch} from "../utils/secureFetch";

function ProfileDetails() {
  const [user, setUser] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await secureFetch(`${apiUrl}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.error("Failed to fetch user profile", data.message);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="container mt-5">
      
      <div className="card p-3 shadow-sm mt-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}

export default ProfileDetails;
