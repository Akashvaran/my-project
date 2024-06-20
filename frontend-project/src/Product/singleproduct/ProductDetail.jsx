import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [likes, setLikes] = useState(0);
    const [userRating, setUserRating] = useState('');
    const [userLiked, setUserLiked] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/product/products/${id}`);
                const productData = response.data;
                setProduct(productData);
                setLikes(productData.Like || 0);
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error('Error fetching product details');
            }
        };

        fetchProduct();
    }, [id]);

    const handleLike = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/product/products/${id}`, { liked: !userLiked });

            if (response.status === 200 && response.data) {
                const updatedProduct = response.data;
                setLikes(updatedProduct.Like || 0);
                setUserLiked(!userLiked);
                setProduct(updatedProduct);
                toast.success(userLiked ? 'Product unliked successfully' : 'Product liked successfully');
            } else {
                console.error('Error liking product:', response.statusText);
                toast.error('Error liking product');
            }
        } catch (error) {
            console.error('Error liking product:', error);
            toast.error('Error liking product');
        }
    };

    const handleRatingSubmit = async (event) => {
        event.preventDefault();
        try {
            const newRate = parseFloat(userRating);
            const response = await axios.post(`http://localhost:8000/product/products/${id}/rate`, { rating: newRate });

            if (response.status === 200 && response.data) {
                setProduct(response.data);
                setUserRating('');
                toast.success('Rating submitted successfully');
            } else {
                console.error('Error rating product:', response.statusText);
                toast.error('Error submitting rating');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Error submitting rating: ${error.response.data.message}`);
            } else {
                toast.error('Error submitting rating');
            }
        }
    };

    if (!product) {
        return (
            <div className="loading-container">
                <div className="spinner" />
                <ToastContainer />
            </div>
        );
    }

    return (
        <div className="container product-detail-container">
            <div className="product-detail-card">
                <div className="product-detail-content">
                    <img
                        src={product.Image || 'https://via.placeholder.com/150'}
                        alt={product.Name}
                        className="product-detail-img"
                    />
                </div>
                <div className="product-detail-body">
                    <h2 className="product-detail-title">{product.Name}</h2>
                    <p className="product-detail-description">
                        <strong>Description: </strong>{product.Description}
                    </p>
                    <p className="product-detail-price">
                        <strong>Price: </strong>${product.Price}
                    </p>
                    <div className="product-detail-rating">
                        <div className='like-component'>
                            <div className="likes" onClick={handleLike}>
                                {userLiked ? <GoHeartFill /> : <GoHeart />}
                            </div>
                            <div>Likes: {likes}</div>
                        </div>
                        <div className='rating'>
                            Rating
                            <div> {product.Rate}</div>
                        </div>
                    </div>
                    <p className="product-detail-category">
                        <strong>Category: </strong>{product.Category}
                    </p>
                    <form onSubmit={handleRatingSubmit}>
                        <label htmlFor="userRating">Rate this product:</label>
                        <input
                            type="number"
                            id="userRating"
                            min="1"
                            max="5"
                            value={userRating}
                            onChange={(e) => setUserRating(e.target.value)}
                        />
                        <button type="submit">Submit Rating</button>
                    </form>
                   
                    <div className='collection'>
                        <button className='Payment'>buy</button>
                        <button className='Collection'> Add to cart</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export { ProductDetail };
