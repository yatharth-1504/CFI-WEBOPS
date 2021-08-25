"use strict";
var mongoose = require("mongoose");
// Schema is basically structure 
var User = mongoose.model("User", new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number
}));
module.exports = User;
