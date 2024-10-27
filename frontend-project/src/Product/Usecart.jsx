import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get('http://localhost:8000/api/cart', {
                    headers: { Authorization: `Bearer ${token}` }
                   
                });

                if (response.status === 200) {
                    console.log(response.data)
                    setCartItems(response.data);
                   
                } else {
                    console.error('Error fetching cart items:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const addToCart = async (productId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('You need to log in to add items to the cart.');
                setLoading(false);
                return;
            }

            const response = await axios.post(
                `http://localhost:8000/api/add`,
                { productId, quantity: 1 },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                setCartItems(response.data.cart);
                toast.success('Product added to cart successfully');
            } else {
                console.error('Error adding product to cart:', response.statusText);
                toast.error('Error adding product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Error adding product to cart');
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('You need to log in to remove items from the cart.');
                setLoading(false);
                return;
            }

            const response = await axios.delete(`http://localhost:8000/api/cart/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            if (response.status === 200) {
                setCartItems(response.data.cart);
                toast.success('Item removed from cart successfully');
            } else {
                console.error('Error removing item from cart:', response.statusText);
                toast.error('Error removing item from cart');
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
            toast.error('Error removing item from cart');
        } finally {
            setLoading(false);
        }
    };

    const isProductInCart = (productId) => {
        console.log(cartItems);
        return cartItems.some((item) => item.productId === productId);
      
        
    };

  
    return { addToCart, removeFromCart, cartItems, loading, isProductInCart};
};

export default useCart;

