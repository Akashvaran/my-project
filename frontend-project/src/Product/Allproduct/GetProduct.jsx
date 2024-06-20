import { useState, useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GetProduct.css';

function Allproduct() {
    const [products, setProducts] = useState([]);
    const [loadingState, setLoadingState] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/product/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
        console.log('Adding to cart:', product);
        // Implement your add to cart functionality here
    };

    const handleGoSomewhere = (productId) => {
        setLoadingState(prevState => ({ ...prevState, [productId]: true }));
        setTimeout(() => {
            setLoadingState(prevState => ({ ...prevState, [productId]: false }));
            navigate(`/product/${productId}`);
        }, 800); 
    };

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {products.map((product) => (
                <Card key={product._id} className="m-2" style={{ width: '20rem' }}>
                    <Card.Img 
                        variant="top" 
                        src={product.Image || 'https://via.placeholder.com/150'} 
                        alt={product.Name} 
                        className="card-img-top"
                    />
                    <Card.Body>
                        <Card.Title className="card-title">{product.Name}</Card.Title>
                        <Card.Text className="card-texts">
                            <strong >Price: </strong><span className='Price'>${product.Price}</span>
                        </Card.Text>
                       
                        <div className='CartButton'>
                            <Button 
                                variant="primary" 
                                onClick={() => handleGoSomewhere(product._id)} 
                                disabled={loadingState[product._id]}
                            >
                                {loadingState[product._id] ? <Spinner animation="border" size="sm" /> : 'Go somewhere'}
                            </Button>
                            <Button 
                                className="btn-cart" 
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export { Allproduct };
