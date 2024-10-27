import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    products: [{
        productId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'ProductCollection',
            required: true 
        },
        quantity: { 
            type: Number, 
            default: 1, 
            min: 1 
        }
    }],
    totalAmount: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    customerName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    customerMobile: {
        type: Number,  
        required: true
    },
    orderDate: { 
        type: Date, 
        default: Date.now 
    },
    deliveryDate: { 
        type: Date
    },
    status: { 
        type: String, 
        default: 'Pending', 
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] 
    }
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;

