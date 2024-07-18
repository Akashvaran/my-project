import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar } from 'react-icons/fa';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [likes, setLikes] = useState(0);
    const [userRating, setUserRating] = useState(null);
    const [userLiked, setUserLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [rateColor, setRateColor] = useState(null);

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
        try {
            const response = await axios.post(`http://localhost:8000/product/products/${id}/rate`, { rating: userRating });

            if (response.status === 200 && response.data) {
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
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('You need to log in to add items to the cart.');
                return;
            }

            const response = await axios.post(
                `http://localhost:8000/api/add`,
                { productId: id, quantity: 1 },
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
        }
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
                        <button className='Payment'>Buy</button>
                        <button className='Collection' onClick={handleAddToCart}>Add to cart</button>
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

