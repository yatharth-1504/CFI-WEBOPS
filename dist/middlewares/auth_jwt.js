"use strict";
//this is bassically for token verificattion 
var jwt = require("jsonwebtoken");
var config = require("../configure/auth_config");
var db = require("../models/index");
var User = db.user;
var verifyToken;
verifyToken = function (req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        req.UserId = decoded.id;
        next();
    });
};
var authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;
