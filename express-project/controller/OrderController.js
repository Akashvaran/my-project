// controllers/orderController.js
import OrderModel from '../model/orderModel.js';


// Create a new order
export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const orderDate = new Date();
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 3);

    const newOrder = new OrderModel({
      ...orderData,
      orderDate: orderDate,
      deliveryDate: deliveryDate
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await OrderModel.find({ userId })
      .populate({
        path: 'products.productId',
        select: 'Name Price Image',  
      });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

