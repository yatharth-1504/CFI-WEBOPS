//this is bassically for token verificattion 
import jwt = require("jsonwebtoken");
import config = require("../configure/auth_config");
import db = require("../models/index");
const User = db.user

let verifyToken : (req : any , res : any, next : any) => any;
verifyToken = (req, res, next) =>{
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({ message: "No token provided!"});
    }
    jwt.verify(token, config.secret, (err : any , decoded : any) => {
        if(err){
            return res.status(401).send({ message : "Unauthorized"});
        }
        req.UserId = decoded.id;
        next();
    })
}
const authJwt = {
    verifyToken
}
export = authJwt;
