import React, { useEffect, useState } from "react";
import secureAxios from "../utils/secureAxios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    try {
      const { data } = await secureAxios.get("/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Remove items with null product (from deleted products)
      const validItems = data.cart.cartItems.filter(item => item.product !== null);
      setCartItems(validItems);

      const totalPrice = validItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      setTotal(totalPrice);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await secureAxios.delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleQuantityChange = async (productId, delta) => {
    const item = cartItems.find(item => item.product._id === productId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) return;

    try {
      await secureAxios.post(
        "/cart",
        { product: productId, quantity: delta },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  return (
    <div className="container mt-4">
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li
                key={item.product._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5>{item.product.name}</h5>
                  <p>₹{item.product.price}</p>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleQuantityChange(item.product._id, -1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleQuantityChange(item.product._id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <span>
                    Subtotal: ₹{item.product.price * item.quantity}
                  </span>
                  <button
                    className="btn btn-sm btn-danger mt-2"
                    onClick={() => handleRemove(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h4 className="mt-4">Total: ₹{total}</h4>
        </>
      )}
    </div>
  );
};

export default Cart;
