//There are 2 main functions for Authentication:
//- signup: create new User in database
//- signin:
//find username of the request in database, if it exists
//compare password with password in database using bcrypt, if it is correct
//generate a token using jsonwebtoken
//return user information & access Token

import  config = require("../configure/auth_config.js");
import db = require("../models");
const User = db.user;

import jwt = require("jsonwebtoken");
import bcrypt = require("bcryptjs");
let signup : (req :any, res: any) => void;
signup = (req, res) => {
        const user = new User({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8),
        age : req.body.age
    });
    user.save((err, user) => {
        if (err){
            res.status(500).send({messsage : err});
            return;
        }
        else {
            res.send({message : "user registered succesfully !"})
        }
    });
}
let signin : (req : any, res : any) => void;
signin = (req, res) => {
    User.findOne({
        username : req.body.username 
    }, (err, user) =>{
        if(err){
            res.status(500).send({message : err});
            return;
        }
        if(!user){
            return res.status(404).send({message : " user not found."}); 
        }
        var passwordIsvalid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsvalid){
            return res.status(401).send({acsessToken : null, message : "Invalid pasword !"});
        }
        var token = jwt.sign({id : user.id }, config.secret, {expiresIn : 86400 });
        res.status(200).send({
            id : user._id,
            username : user.username, 
            email : user.email,
            age : user.age,
            acessToken : token
        });
    }) 
}
export = {signup, signin};