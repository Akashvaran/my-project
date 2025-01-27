// src/addtocart/Addtocart.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Addtocart.css';
import { useCart } from './CartContext'; // Adjust the import path as needed

const Addtocart = () => {
    const { cartItems, setCartItems } = useCart();
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('You need to log in to view your cart.');
                setLoading(false);
                return;
            }

            const response = await axios.get('http://localhost:8000/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.status === 200) {
                setCartItems(response.data);
            } else {
                console.error('Error fetching cart:', response.statusText);
                toast.error('Error fetching cart');
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            toast.error('Error fetching cart');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [cartItems]);

    const handleRemoveItem = async (productId) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('You need to log in to perform this action.');
                return;
            }

            const response = await axios.delete(`http://localhost:8000/api/cart/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });

            if (response.status === 200) {
                toast.success('Item removed from cart successfully');
                fetchCart(); // Refetch the cart after removing an item
            } else {
                console.error('Error removing item from cart. Status:', response.status, 'Message:', response.statusText);
                toast.error('Error removing item from cart');
            }
        } catch (error) {
            console.error('Error removing item from cart:', error.message);
            toast.error('Error removing item from cart');
        }
    };

   
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner" />
                <ToastContainer />
            </div>
        );
    }

    return (
        <>
        <div className="cart-container">
            <h2>Your Cart</h2>
            <p>Total Products: {totalQuantity}</p> {/* Display total quantity */}
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.productId._id} className="cart-item">
                            <img
                                src={item.productId.Image || 'https://via.placeholder.com/150'}
                                alt={item.productId.Name}
                                className="cart-item-img"
                            />
                            <div className="cart-item-details">
                                <h3>{item.productId.Name}</h3>
                                <p>Price: ${item.productId.Price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => handleRemoveItem(item.productId._id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ToastContainer />


        </div>
        </>
    );
}

export { Addtocart };


