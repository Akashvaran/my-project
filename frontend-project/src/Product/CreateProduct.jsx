import { useState } from 'react';
import './CreateProduct.css';
import axios from 'axios';
// import Jsonfile from '../Product/Product.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProduct = () => {
    const [product, setProduct] = useState({
        Name: '',
        Price: '',
        Description: '',
        Category: '',
        Image: '',
        Rate: '',
        Like: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleRatingChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/product/products', product);
            console.log('Response data:', response.data);

            toast.success('Product created successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });

            // Clear the form after successful submission
            setProduct({
                Name: '',
                Price: '',
                Description: '',
                Category: '',
                Image: '',
                Rate: '',
                Like: ''
            });
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error('Error creating product!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
        }
    };

    // const handleBulkSubmit = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:8000/product/products/bulk', Jsonfile);
    //         console.log('Bulk insertion response:', response.data);
    //     } catch (error) {
    //         console.error('Error in bulk insertion:', error);
    //     }
    // };

    return (
        <div className='fullcontainer'>
            <ToastContainer />
            <div className="create-product-container">
                <h2>Create Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group-data'>
                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <input
                                type="text"
                                name="Name"
                                value={product.Name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Price">Price</label>
                            <input
                                type="number"
                                name="Price"
                                value={product.Price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Description">Description</label>
                            <textarea
                                name="Description"
                                value={product.Description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Category">Category</label>
                            <input
                                type="text"
                                name="Category"
                                value={product.Category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Image">Image URL</label>
                            <input
                                type="text"
                                name="Image"
                                value={product.Image}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Rate">Rating (Rate)</label>
                            <input
                                type="number"
                                name="Rate"
                                value={product.Rate}
                                onChange={handleRatingChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Like">Rating (Like)</label>
                            <input
                                type="number"
                                name="Like"
                                value={product.Like}
                                onChange={handleRatingChange}
                            />
                        </div>
                    </div>
                    <button type="submit">Create Product</button>
                </form>
                {/* <button className='buttonsClick' onClick={handleBulkSubmit}>Bulk Insert Products from JSON</button> */}
            </div>
        </div>
    );
};

export default CreateProduct;
