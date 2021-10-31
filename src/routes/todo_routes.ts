var db = require("../models") 
var authJWT = require("../middlewares/auth_jwt"); 
const verifyToken = authJWT.verifyToken;


const User = db.user;

let content : (req : any, res : any) => any;

let addtodo : (req : any, res : any) => any;

let updatetodo : (req : any, res : any) => any;

let deletetodo : (req : any, res : any) => any;

content = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if(user) return res.send(user.todos); 
        else res.send("user not found");
    }catch(e){
        return res.send({message : e});
    }
}

addtodo = async (req : any , res : any) => {
    try {
        //console.log(req.body);
        const user = await User.findOne({ username : req.body.username });
        if(user){ 
            //console.log("HI");
            let t = req.body.task.toString();
            if(!user.todos.includes(req.body.task)){
                user.todos.push(t);
                user.save((err : any) => {
                    if (err){
                    //console.log("HI");
                    return res.send({message : err});
                    }
                return res.send('Added a task to Todo list');
                });
            }
            else{
                return res.send("Task previously exists");
            }
        }
        else{
            res.send("User not found");
        }
    }
    catch(e){
        //console.log("HI");
        return res.send({message : e}); 
    }
}

updatetodo = async(req, res) => {
    try{
        const user = await User.findOne({username : req.body.username});
        if(user){
            if(user.todos.length > 0){
                for(let i = 0; i < user.todos.length; i++){
                    if(user.todos[i] === req.body.tobeupdated.toString()){
                        user.todos[i] = req.body.newtodo.toString();
                        user.save((err : any) => {
                            if (err){
                                return res.send({message : err});
                            }
                        })        
                        res.send("Updated TODO");
                    }       
                }
                    res.send("Requested task not found");
                }
                else {
                    return res.send("NO tasks"); 
                }
            }
            
        else {
            res.send("User not found");
        }
    }
    catch(e){
        res.send({message : e});
    }
}

deletetodo = async(req, res) => {
    try{
        const user = await User.findOne({username : req.body.username});
        if(user){
            for(let i = 0; i < user.todos.length; i++)
                if(user.todos[i] === req.body.task.toString()){
                    user.todos.splice(i, 1);
                    user.save((err : any) =>{
                        if(err) res.send({message : err});
                    });
                    res.send("DELETED SUCCESFULLY");
                }
            res.send("Task not found");
        }
        else res.send("Requested user not found");
    }
    catch(err){
        res.send({message : err});
    }
}

export = (app : any) => {
    app.use(function(req : any , res : any , next : any){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();// this function is bassically for invoking the next middleware 
    });
    app.post("/api/auth/signin/addtodo", verifyToken, addtodo);
    app.post("/api/auth/signin/updatetodo", verifyToken, updatetodo);
    app.post("/api/auth/signin/deletetodo", verifyToken, deletetodo);
    app.get("/api/auth/signin/todolist", verifyToken, content);
}
