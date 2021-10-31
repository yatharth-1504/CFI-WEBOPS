"use strict";
//There are 2 main functions for Authentication:
//- signup: create new User in database
//- signin:
//find username of the request in database, if it exists
//compare password with password in database using bcrypt, if it is correct
//generate a token using jsonwebtoken
//return user information & access Token
var config = require("../configure/auth_config");
var db = require("../models");
var User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var signup;
signup = function (req, res) {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        age: req.body.age
    });
    user.save(function (err, user) {
        if (err) {
            res.status(500).send({ messsage: err });
            return;
        }
        else {
            res.send({ message: "user registered succesfully !" });
        }
    });
};
var signin;
signin = function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: " user not found." });
        }
        var passwordIsvalid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsvalid) {
            return res.status(401).send({ acsessToken: null, message: "Invalid pasword !" });
        }
        var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            age: user.age,
            acessToken: token
        });
    });
};
module.exports = { signup: signup, signin: signin };
