const mongoose = require("mongoose");

// const database =  "mongodb+srv://carlosfranco041797:Lenovo.1507@cluster0.gxjly6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://carlosfranco041797:Lenovo.1507@cluster0.gxjly6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log('DB is connected')
  } catch (error) {
    console.log("Error:", error.message);
  }
};
 
module.exports = connectDB;
