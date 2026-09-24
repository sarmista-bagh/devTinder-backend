const mongoose = require('mongoose');

const connectDB = async () => {

    await mongoose.connect("mongodb+srv://sarmistabagh88_db_user:D4WMI0eOPdxCRMZg@thinder.jzz1tbb.mongodb.net/tinder")
    //  await mongoose.connect("mongodb+srv://sarmistabagh88_db_user:VFgATRTleG4x50Rx@devthinderdb.z8baco1.mongodb.net/devTinder");//this is databae name i added here - devTinder 



};


module.exports = connectDB;


