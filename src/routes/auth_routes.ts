import verifySignUp = require("../middlewares/verifysignup");
import controller = require("../controllers/auth_controller");

export = function(app : any){
    app.use(function(req : any , res : any , next : any){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();// this function is bassically for invoking the next middleware 
    });
    app.post("/api/auth/signup", verifySignUp, controller.signup);
    app.post("/api/auth/signin", controller.signin);
};
