
import express from 'express';
import { addToCart, deleteCartItem, getCart } from '../controller/CartController.js';
import { Verification } from '../midelware/Verification.js';

const cartRoute = express.Router();

cartRoute.route('/add').post(Verification, addToCart);
cartRoute.route('/cart').get(Verification, getCart);
cartRoute.route('/cart/:productId').delete(Verification, deleteCartItem);


export default cartRoute;
