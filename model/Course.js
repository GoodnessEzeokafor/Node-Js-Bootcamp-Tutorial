const mongoose = require("mongoose")

const courseSchema = new mongoose.mongoose.Schema({
    name : String,
    author:String,
    tags:[String] ,
    date:{
        type:Date, 
        default:Date.now
    } 
})