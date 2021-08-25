"use strict";
// here we are making a funtion to check email and username for avoiding duplication
var db = require("../models/index");
var User = db.user;
var check;
check = function (req, res, next) {
    // for username
    User.findOne({
        username: req.body.username
    }).exec(function (err, user) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Username already taken!" });
            return;
        }
        // for email 
        User.findOne({
            email: req.body.email
        }).exec(function (err, user) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(500).send({ message: "Email is already taken" });
                return;
            }
            next();
        });
    });
};
module.exports = check;
