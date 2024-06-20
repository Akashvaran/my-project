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
    ProfilePic:String
});
const authenticationModel = mongoose.model('mernstackecom', authenticationSchema);

export default authenticationModel;
