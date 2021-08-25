import mongoose = require("mongoose");
// Schema is basically structure 
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username : String,
        email : String,
        password : String,
        age : Number
    })
);
export = User;