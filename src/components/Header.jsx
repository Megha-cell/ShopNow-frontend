import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/Header.css';


function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    navigate('/');
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">ShopNow</Link>
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav align-items-center">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>

          {/* ✅ Admin-only menu item */}
          {role === 'admin' && (
            <li className="nav-item">
              <Link className="nav-link text-danger fw-bold" to="/admin">
                Admin Dashboard
              </Link>
            </li>
          )}

          {isLoggedIn ? (
            <>
            
            <li className="nav-item dropdown">
  <a
    className="nav-link dropdown-toggle"
    href="#"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Profile
  </a>
  <ul className="dropdown-menu">
    <li>
      <Link className="dropdown-item" to="/profile">View Profile</Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/updateprofile">Update Profile</Link>
    </li>
  </ul>
</li>

              <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/orders">Order History</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/checkout">Checkout</Link></li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            </>
          )}

          {/* 🔍 Search Bar */}
          <li className="nav-item ms-3">
            <form onSubmit={handleSearch} className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Type something..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
