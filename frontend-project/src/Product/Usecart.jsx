import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useCart = () => {
    const [loading, setLoading] = useState(false);

    const addToCart = async (productId, setLoadingState) => {
        setLoading(true);
        setLoadingState(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('You need to log in to add items to the cart.');
                setLoading(false);
                setLoadingState(false);
                return;
            }

            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

            const response = await axios.post(
                `http://localhost:8000/api/add`,
                { productId, quantity: 1 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
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
            setLoadingState(false);
        }
    };

    return { addToCart, loading };
};

export default useCart;

