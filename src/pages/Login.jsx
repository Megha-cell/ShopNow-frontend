import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { secureFetch } from '../utils/secureFetch';
import '../css/Login.css'; // Scoped CSS for Instagram style
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await secureFetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
        window.location.reload();
      } else {
        toast.error(data.message || 'Invalid credentials')
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="myshop-login-container">
      <div className="myshop-login-box">
      <div className="myshop-login-brand">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="shopnow-logo"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.9L4.24 7 12 3.1 19.76 7 12 9.9zm0 2.1l10-5v6c0 5.25-3.84 9.68-9 10-5.16-.32-9-4.75-9-10V9l10 5z" />
  </svg>
  <span>ShopNow</span>
</div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="myshop-login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="myshop-login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="myshop-login-btn">Log In</button>
        </form>
        <button className="forgot-password-btn" onClick={handleForgotPassword}>
          Forgot password?
        </button>
      </div>
    </div>
  );
}

export default Login;
