"use strict";
var authJWT = require("../middlewares/auth_jwt");
var user_controller = require("../controllers/user_controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.get("/api/test/user", [authJWT.verifyToken], user_controller);
};
