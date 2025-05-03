import { useEffect, useState } from "react";
import { fetchOrders } from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="container mt-4">
      
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Order ID: {order._id}</h5>
              <p className="mb-1"><strong>Status:</strong> {order.orderStatus}</p>
              <p className="mb-1"><strong>Payment:</strong> {order.paymentStatus}</p>
              <p className="mb-3"><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>

              <ul className="list-group mb-3">
                {order.orderItems.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.product?.name || "Product not found"}</strong><br />
                      Quantity: {item.quantity} × ₹{item.price}
                    </div>
                    <span className="badge bg-primary rounded-pill">
                      ₹{item.quantity * item.price}
                    </span>
                  </li>
                ))}
              </ul>

              <h6 className="text-end">Total: ₹{order.totalPrice}</h6>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
