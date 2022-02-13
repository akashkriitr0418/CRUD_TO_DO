const  mongoose  = require("mongoose");
const { stringify } = require("querystring");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 4
    },
    email:{
        type: String,
        required: true,
        max: 255,
        min: 6,
        unique:1
    },
    password:{
        type: String,
        required: true,
        max: 255,
        min: 6,
        unique:1
    } 
})

module.exports = new mongoose.model("userSchema", userSchema);