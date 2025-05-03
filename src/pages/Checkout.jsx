import React, { useState } from "react";
import secureAxios from "../utils/secureAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // 1. Get cart
      const cartRes = await secureAxios.get("/cart");

      const validItems = cartRes.data.cart.cartItems.filter(
        (item) => item.product !== null
      );

      const orderItems = validItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const totalPrice = orderItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      if (orderItems.length === 0) {
        //alert("Your cart is empty.");
        toast.error("Your cart is empty.");
        return;
      }

      // 2. Place order with paid + shipped status
      await secureAxios.post("/orders", {
        orderItems,
        totalPrice,
        shippingInfo,
        paymentStatus: "paid",      // ✅ set paid
        orderStatus: "shipped",     // ✅ set shipped
      });

      // 3. Clear cart
      await secureAxios.delete("/cart/clear");

      //("alert🎉 Order placed successfully!");
      toast.success("Order placed successfully")
      navigate("/orders");
    } catch (err) {
      console.error("Failed to place order:", err);
      toast.error("Something went wrong while placing your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
     
      <form className="mb-4">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={shippingInfo.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Shipping Address</label>
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </form>

      <button
        className="btn btn-primary"
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
