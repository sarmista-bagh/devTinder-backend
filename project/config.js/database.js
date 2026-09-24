const mongoose = require('mongoose');
const connectDB = async () =>{
   
        await mongoose.connect("mongodb+srv://sarmistabagh88_db_user:D4WMI0eOPdxCRMZg@thinder.jzz1tbb.mongodb.net/tinder")
    
}

module.export = connectDB;