import mongoose = require("mongoose");
import USER = require("./user_model");
mongoose.Promise = global.Promise;

const db = { mongoose : mongoose, user: USER };
export = db;
