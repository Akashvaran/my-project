// routes/orderRoutes.js
import express from 'express';
import { createOrder,getOrdersByUserId } from '../controller/OrderController.js';

const OrderRouter = express.Router();

OrderRouter.post('/order', createOrder);
OrderRouter.get('/orders/:userId', getOrdersByUserId);

export default OrderRouter;
