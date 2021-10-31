import mongoose = require("mongoose");
// Schema is basically structure 
interface IUser {
    username: string;
    email: string;
    password: string;
    age : number,
    todos: []
}
const User = mongoose.model<IUser>(
    "User",
    new mongoose.Schema<IUser>({
        username : String,
        email : String,
        password : String,
        age : Number,
        todos : []
    })
);

export = User;