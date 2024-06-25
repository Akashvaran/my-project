import mongoose from "mongoose";

const authenticationSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Mobile: Number,
    Password: String,
    Address: String,
    City:String,
    State: String,
    PinCode: String,
    Country: String,
    ProfilePic:String,
    Cart: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCollection' },
        quantity: { type: Number, default: 1 }
    }]
});
const authenticationModel = mongoose.model('mernstackecom', authenticationSchema);

export default authenticationModel;
