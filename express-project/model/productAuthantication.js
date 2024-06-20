import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true, 
        trim: true 
    },
    Price: {
        type: Number,
        required: true, 
        min: 0 
    },
    Description: {
        type: String,
        trim: true 
    },
    Category: {
        type: String,
        trim: true 
    },
    Image: {
        type: String,
        trim: true 
    },
    Rate: {
        type: Number,
        default: 0, 
        min: 0, 
        max: 5 
    },
    Like: {
        type: Number,
        default: 0, 
        min: 0 
    },
   
});

const productModel = mongoose.model('ProductCollection', productSchema);

export default productModel;

