// here we are making a funtion to check email and username for avoiding duplication
import db = require("../models/index");
const User = db.user;

var check : (req : any, res : any , next : any) => any;
check = async (req, res, next) =>{
    try {
        const user = await User.findOne({ username : req.body.username });
        if (user) {
            return res.status(200).send("Username already taken");
        }
        else {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(200).send("Email already taken");
            }
        }
        next();
    }
    catch (e) {
        res.send({ message: e });
        return;
    }   
};
 
export = check;