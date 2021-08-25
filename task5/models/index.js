"use strict";
var mongoose = require("mongoose");
var USER = require("./user_model");
mongoose.Promise = global.Promise;
var db = { mongoose: mongoose, user: USER };
module.exports = db;
