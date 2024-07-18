import { useState } from 'react';
import './CreateProduct.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Jsonfile from './Product.json'


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
        <>
        <div className='fullcontainer'>
            <ToastContainer />
            <div className="create-product-container">
                <h2>Create Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group-data'>
                        <div className="form-groups">
                            <label htmlFor="Name">Name</label>
                            <input className='create-input'
                                type="text"
                                name="Name"
                                value={product.Name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-groups">
                            <label htmlFor="Price">Price</label>
                            <input className='create-input'
                                type="number"
                                name="Price"
                                value={product.Price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-groups">
                            <label htmlFor="Description">Description</label>
                            <textarea
                                name="Description"
                                value={product.Description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-groups">
                            <label htmlFor="Category">Category</label>
                            <input className='create-input'
                                type="text"
                                name="Category"
                                value={product.Category}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-groups">
                            <label htmlFor="Image">Image URL</label>
                            <input className='create-input'
                                type="text"
                                name="Image"
                                value={product.Image}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-groups">
                            <label htmlFor="Rate">Rating (Rate)</label>
                            <input className='create-input'
                                type="number"
                                name="Rate"
                                value={product.Rate}
                                onChange={handleRatingChange}
                            />
                        </div>
                        <div className="form-groups">
                            <label htmlFor="Like">Rating (Like)</label>
                            <input className='create-input'
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
        </>
    );
};

export default CreateProduct



// export const CreateProducts = () => {
//   return (
//     <div>
//       {Jsons.map(product => (
//         <div key={product.id}>
//           <h2>{product.Name}</h2>
//           <p>Price: ${product.Price}</p>
//           <img src={product.Image} alt={product.Name} />
//           <div>
//             {product.Images.map((img, index) => (
//               <img key={index} src={img} alt={`${product.Name} - ${index}`} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
