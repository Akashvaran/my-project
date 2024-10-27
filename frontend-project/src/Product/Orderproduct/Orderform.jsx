import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Orderform.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const OrderForm = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/product/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Error fetching product details.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleOrderSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('User not logged in. Please log in to place an order.');
      return;
    }

    // Decode the JWT token to get the user ID
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    // Construct the order object
    const order = {
      userId: userId,
      products: [{ productId: id, quantity }],
      totalAmount: product.Price * quantity,
      customerName,
      address: customerAddress,
      customerMobile
    };

    try {
      await axios.post('http://localhost:8000/buy/order', order, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      // Display success toast and reset form
      toast.success('Order placed successfully!');
      setQuantity(1);
      setCustomerName('');
      setCustomerAddress('');
      setCustomerMobile('');
      setOrderStatus('');
    } catch (error) {
      console.error('Error placing order:', error.response ? error.response.data : error.message);
      toast.error('Failed to place order.');
      setOrderStatus('Failed to place order.');
    }
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="order-form-container">
      <h2>Order Form</h2>
      <form onSubmit={handleOrderSubmit}>
        <div className="product-info">
          <h3>{product.Name}</h3>
          <img src={product.Image} alt={product.Name} />
          <p><strong>Price:</strong> ${product.Price}</p>
        </div>
        <div className="forms-groups">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
        </div>
        <div className="forms-groups">
          <label htmlFor="customerName">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="forms-groups">
          <label htmlFor="customerMobile">Customer Mobile:</label>
          <input
            type="text"
            id="customerMobile"
            value={customerMobile}
            onChange={(e) => setCustomerMobile(e.target.value)}
            required
          />
        </div>
        <div className="forms-groups">
          <label htmlFor="customerAddress">Customer Address:</label>
          <textarea
            id="customerAddress"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Place Order</button>
      </form>
      {orderStatus && <p className="order-status">{orderStatus}</p>}
      <ToastContainer />
    </div>
  );
};
