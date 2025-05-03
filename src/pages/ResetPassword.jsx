import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import secureAxios from '../utils/secureAxios';
import { toast } from "react-toastify";
function ResetPassword() {
  const { token } = useParams(); // Extract token from URL params
  const [password, setPassword] = useState('');
  //const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST request to reset password
      await secureAxios.post(`/auth/reset-password/${token}`, { password });
      //setMessage('Password reset successful');
      toast.success('Password reset successful')
      // Redirect to login after success
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      //setMessage(err.response?.data?.message || 'Error occurred');
      toast.error(err.response?.data?.message || 'Error occurred')
    }
  };

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success" type="submit">Reset Password</button>
      </form>
      {/* {message && <p className="mt-3 text-info">{message}</p>} */}
    </div>
  );
}

export default ResetPassword;
