const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const isConnected = await mongoose.connect(process.env.DB_CONNECTION);
        if(isConnected) console.log("Connected to mongodb")
    }catch(err){
        console.log("Connection to mongodb failed")
    }

}


module.exports = connectDB