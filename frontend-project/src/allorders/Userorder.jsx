// OrderProducts.js

import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Userorder.css";

export const OrderProducts = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not logged in. Please log in to view orders.");
        setLoading(false);
        return;
      }

      // Decode the JWT token to get the user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      try {
        const response = await axios.get(
          `http://localhost:8000/buy/orders/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error(
          "Error fetching orders:",
          error.response ? error.response.data : error.message
        );
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const newCountdown = {};
      orders.forEach((order) => {
        const deliveryDate = new Date(order.deliveryDate);
        const now = new Date();
        const timeDifference = deliveryDate - now;
        if (timeDifference < 0) {
          newCountdown[order._id] = "Delivered";
        } else {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
          newCountdown[order._id] = `${days}d ${hours}h ${minutes}m`;
        }
      });
      setCountdown(newCountdown);
    };

    const intervalId = setInterval(updateCountdown, 60000);

    updateCountdown();

    return () => clearInterval(intervalId);
  }, [orders]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              <div className="order-section user-details">
                <h4>User Details</h4>
                <p>
                  <strong>Customer Name:</strong> {order.customerName}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Mobile:</strong> {order.customerMobile}
                </p>
              </div>
              <div className="order-section product-details">
                <h4>Product Details</h4>
                <ul className="product-list">
                  {order.products.map((item, index) => (
                    <li key={index} className="product-item">
                      <img
                        src={item.productId.Image}
                        alt={item.productId.Name}
                        className="product-image"
                      />
                      <div className="product-info">
                        <p>
                          <strong>Product Name:</strong> {item.productId.Name}
                        </p>
                        <p>
                          <strong>Price:</strong> ${item.productId.Price}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {item.quantity}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-section status-details">
                <h4>Status & Dates</h4>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.orderDate).toLocaleString()}
                </p>
                <p>
                  <strong>Delivery Date:</strong>{" "}
                  {new Date(order.deliveryDate).toLocaleString()}
                </p>
                <p>
                  <strong>Delivery Countdown:</strong>{" "}
                  {countdown[order._id]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ToastContainer />
    </div>
  );
};

