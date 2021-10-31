"use strict";
var verifySignUp = require("../middlewares/verifysignup");
var controller = require("../controllers/auth_controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next(); // this function is bassically for invoking the next middleware 
    });
    app.post("/api/auth/signup", verifySignUp, controller.signup);
    app.post("/api/auth/signin", controller.signin);
};
