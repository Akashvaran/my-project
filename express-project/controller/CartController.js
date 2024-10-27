import authenticationModel from '../model/authithantication.js';
import productModel from '../model/productAuthantication.js';

const addToCart = async (req, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ msg: "Invalid product ID or quantity" });
    }

    try {
        const user = await authenticationModel.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const cartItemIndex = user.Cart.findIndex(item => item.productId.equals(productId));
        if (cartItemIndex !== -1) {
            user.Cart[cartItemIndex].quantity += quantity;
        } else {
            user.Cart.push({ productId, quantity });
        }

        await user.save();
        res.status(200).json({ msg: "Product added to cart", cart: user.Cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const getCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await authenticationModel.findById(userId).populate('Cart.productId');

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(user.Cart);
    } catch (error) {
        console.error('Error getting cart:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const deleteCartItem = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    try {
        const user = await authenticationModel.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const itemIndex = user.Cart.findIndex(item => item.productId.equals(productId));

        if (itemIndex === -1) {
            return res.status(404).json({ msg: "Item not found in cart" });
        }

        user.Cart.splice(itemIndex, 1);

        await user.save();

        res.status(200).json({ msg: "Item removed from cart successfully", cart: user.Cart });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


export { addToCart, getCart,deleteCartItem };
