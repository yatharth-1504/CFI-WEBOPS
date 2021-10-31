import authJWT = require("../middlewares/auth_jwt");
import user_controller = require("../controllers/user_controller");

export = function (app :any) {
    app.use(function (req : any, res :  any, next :any) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/test/user", [authJWT.verifyToken], user_controller);
}