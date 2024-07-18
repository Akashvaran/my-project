// routes/productRoutes.js
import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByCategory, bulkInsertProducts, updateProductLikes, updateProductRating, getCategories, searchProducts} from '../controller/productController.js'; 

const productRoute = express.Router();

productRoute.route('/products').get(getProducts);
productRoute.route('/products').post(createProduct);
productRoute.route('/products/:id').get(getProductById);
productRoute.route('/products/:id').put(updateProduct);
productRoute.route('/products/:id').delete(deleteProduct);
productRoute.route('/products/category/:category').get(getProductsByCategory);
productRoute.route('/products/bulk').post(bulkInsertProducts)
productRoute.route('/products/:id/').post(updateProductLikes)
productRoute.route('/products/:id/rate').post(updateProductRating)
productRoute.route('/categories').get(getCategories);
productRoute.route('/search').get(searchProducts);

export default productRoute;
