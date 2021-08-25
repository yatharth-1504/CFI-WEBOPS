// here we are making a funtion to check email and username for avoiding duplication
import db = require("../models/index");
const User = db.user;

var check : (req : any, res : any , next : any) => void;
check = (req, res, next) =>{
    // for username
    User.findOne({
        username : req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message : err});
            return;
        }
        if (user){
            res.status(400).send({message : "Username already taken!"});
            return;
        }
        // for email 
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if(err){
                res.status(500).send({message : err});
                return;
            }
            if (user){
                res.status(500).send({ message : "Email is already taken"});
                return;
            }
            next();
        });
    });
};
 
export = check;