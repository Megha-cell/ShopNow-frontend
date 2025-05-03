import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import RoleRoute from "./components/RoleRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute"; // ⬅️ import here
import { CartProvider } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./pages/EditProduct";
import AllUsers from "./pages/AllUsers";
import Profile from "./pages/Profile.jsx";
import ProfileDetails from "./pages/ProfileDetails.jsx";
import { ToastContainer } from "react-toastify";  // <-- Import ToastContainer
import './App.css';
import "react-toastify/dist/ReactToastify.css"; // <-- Import Toastify styles

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-fill">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route
                path="/admin"
                element={
                  <RoleRoute role="admin">
                    <AdminDashboard />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/all-users"
                element={
                  <RoleRoute role="admin">
                    <AllUsers />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/manage-products"
                element={
                  <RoleRoute role="admin">
                    <ManageProducts />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/add-category"
                element={
                  <RoleRoute role="admin">
                    <AddCategory />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/add-product"
                element={
                  <RoleRoute role="admin">
                    <AddProduct />
                  </RoleRoute>
                }
              />
              <Route
                path="/admin/edit-product/:id"
                element={
                  <RoleRoute role="admin">
                    <EditProduct />
                  </RoleRoute>
                }
              />
              {/* Protected Routes */}
              <Route path="/updateprofile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><ProfileDetails /></PrivateRoute>} />
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <Checkout />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
        {/* This is the ToastContainer that will display all toast notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </CartProvider>
    </Router>
  );
}

export default App;
