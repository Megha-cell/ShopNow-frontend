import { useState } from 'react';
import secureAxios from '../utils/secureAxios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await secureAxios.post('/auth/forgot-password', { email });
      setMessage(`Reset link: ${res.data.resetUrl}`);
      // Redirect to reset password page
      navigate(`/reset-password/${res.data.resetUrl.split('/').pop()}`);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="container mt-5">
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
      {message && <p className="mt-3 text-info">{message}</p>}
    </div>
  );
}

export default ForgotPassword;
