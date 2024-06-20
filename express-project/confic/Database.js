import mongoose from "mongoose";

function databaseConnection(){
    mongoose.connect('mongodb://localhost:27017/MernStack')
    .then(res =>console.log("database is connected"))
    .catch(err =>console.log("data base is not connected"))
    

}

export default databaseConnection