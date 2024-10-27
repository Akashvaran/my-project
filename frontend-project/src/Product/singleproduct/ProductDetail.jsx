import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { FaStar } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import useCart from '../Usecart';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [likes, setLikes] = useState(0);
    const [userRating, setUserRating] = useState(null);
    const [userLiked, setUserLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [rateColor, setRateColor] = useState(null);
    const { addToCart, removeFromCart, cartItems } = useCart();
    const [cartLoading, setCartLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/product/products/${id}`);
                const productData = response.data;
                setProduct(productData);
                setLikes(productData.Like || 0);
                setSelectedImage(productData.Image || 'https://via.placeholder.com/150');
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
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You need to log in to rate a product.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8000/product/products/${id}/rate`, { rating: userRating }, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });

            if (response.status === 200) {
                setProduct(response.data);
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

    const handleAddToCart = async () => {
        setCartLoading(true);
        await addToCart(id);
        setCartLoading(false);
    };

    const handleRemoveFromCart = async () => {
        setCartLoading(true);
        await removeFromCart(id);
        setCartLoading(false);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleStarClick = (rating) => {
        setUserRating(rating);
    };

    const handleStarHover = (rating) => {
        setRateColor(rating);
    };

    if (!product) {
        return (
            <div className="loading-container">
                <Spinner animation="border" />
                <ToastContainer />
            </div>
        );
    }

    return (
        <div className="container product-detail-container">
            <div className="product-detail-card">
                <div className="product-detail-content">
                    <img
                        src={selectedImage}
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
                            <strong>Rating:</strong>
                            <div> {product.Rate}</div>
                        </div>
                    </div>
                    <p className="product-detail-category">
                        <strong>Category: </strong>{product.Category}
                    </p>
                    <form onSubmit={handleRatingSubmit}>
                        <div className="star-rating">
                            {[...Array(5)].map((_, index) => {
                                const currentRate = index + 1;
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={currentRate}
                                            onClick={() => handleStarClick(currentRate)}
                                        />
                                        <FaStar
                                            size={40}
                                            color={currentRate <= (rateColor || userRating) ? "yellow" : "grey"}
                                            onMouseEnter={() => handleStarHover(currentRate)}
                                            onMouseLeave={() => setRateColor(null)}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                        <button type="submit" className="submit-rating">Submit Rating</button>
                    </form>
                    <div className='collection'>
                        <Link to={`/Orderform/${product._id}`}>
                            <button className='Payment'>Buy</button>
                        </Link>
                        {cartItems.some(item => item.productId === product._id) ? (
                            <button
                                className='Collection'
                                onClick={handleRemoveFromCart}
                                disabled={cartLoading}
                            >
                                {cartLoading ? <Spinner animation="border" size="sm" /> : 'Remove from Cart'}
                            </button>
                        ) : (
                            <button
                                className='Collection'
                                onClick={handleAddToCart}
                                disabled={cartLoading}
                            >
                                {cartLoading ? <Spinner animation="border" size="sm" /> : 'Add to Cart'}
                            </button>
                        )}

                    </div>
                </div>
            </div>
            <div className='related-images'>
                {product.Images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`${product.Name} - ${index}`}
                        className="thumbnail"
                        onClick={() => handleImageClick(img)}
                    />
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}

export { ProductDetail };

