import productModel from '../model/productAuthantication.js';


// Get all products
 const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Get a single product by ID
 const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

// Create a new product
 const createProduct = async (req, res) => {
    try {
        const { Name, Price, Description, Category, Image, Rating } = req.body;
        const newProduct = new productModel({
            Name,
            Price,
            Description,
            Category,
            Image,
            Rating
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update an existing product
 const updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.Image = path.join('uploads', req.file.filename).replace(/\\/g, '/');
        }
        const productData = await productModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        if (!productData) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json({ msg: "Product updated", productData });
    } catch (err) {
        console.error('Error occurred while updating product data:', err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


// Delete a product
 const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const productData = await productModel.findByIdAndRemove(id);
        if (!productData) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json({ msg: "Product deleted", productData });
    } catch (err) {
        console.error('Error occurred while deleting product data:', err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
const bulkInsertProducts = async (req, res) => {
    try {
        const products = req.body;
        const insertedProducts = await productModel.insertMany(products);
        res.status(201).json(insertedProducts);
    } catch (error) {
        console.error('Error in bulk insertion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



 const getProductsByCategory = async (req, res) => {
    try {
        const products = await productModel.find({ Category: req.params.category });
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).send('No products found in this category');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};
const updateProductLikes = async (req, res) => {
    try {
        const { liked } = req.body;
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (liked) {
            product.Like += 1;
        } else {
            product.Like = - 1 ;
        }

        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating likes', error });
    }
};



const updateProductRating = async (req, res) => {
    try {
        const { rating } = req.body;
        const productId = req.params.id;

        // Validate input rating
        const parsedRating = parseFloat(rating);
        if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
            return res.status(400).json({ message: 'Invalid rating value' });
        }

        // Find the product by ID
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const totalRating = product.Rate * product.RateCount + parsedRating;
        product.RateCount = (product.RateCount || 0) + 1;
        product.Rate = totalRating / product.RateCount;

        // Save updated product
        await product.save();

        res.json(product);
    } catch (error) {
        console.error('Error updating rating:', error);
        res.status(500).json({ message: 'Error updating rating', error });
    }
};
const getCategories = async (req, res) => {
    try {
        const categories = await productModel.distinct('Category');
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).send(err);
    }
};
const searchProducts = async (req, res) => {
    try {
        const searchTerm = req.query.term;
        // console.log(`Searching for term: ${searchTerm}`);

        if (!searchTerm) {
            return res.status(400).json({ error: 'Search term is required' });
        }

        // console.log("Attempting to find products...");
        const products = await productModel.find({
            Name: { $regex: searchTerm, $options: 'i' }
        });

        // console.log(`Found products: ${products.length}`);
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching search results:', err);
        console.error(err.stack); 
        res.status(500).json({ error: 'Internal Server Error', message: err.message }); 
    }
};
export{getProducts,getProductById,getProductsByCategory,deleteProduct,updateProduct,createProduct,bulkInsertProducts,updateProductLikes,updateProductRating,getCategories,searchProducts}
