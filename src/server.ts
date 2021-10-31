import express = require('express');
import bodyParser = require("body-parser");
import cors = require("cors");
const app = express();
import db_config = require("./configure/db_config") 
import db =  require("./models/index");
import { ConnectOptions } from "mongoose"
type ConnectionOptionsExtend = {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
}
const options: ConnectOptions & ConnectionOptionsExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
db.mongoose
  .connect(`mongodb://${db_config.HOST}:${db_config.PORT}/${db_config.DB}`, options)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

var corsOption : {origin : string };
corsOption = { origin : "http://localhost:3000" }
//cors is checking the http request maching with the route.
app.use(cors(corsOption))
// parse requests of content-type - application/json.
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({extended : true}));
app.get("/", (req,res) =>{
    res.json({message : "developing backend"});
})
require('./routes/auth_routes')(app);
require('./routes/user_routes')(app);
require("./routes/todo_routes")(app);
app.listen(3000, () => {console.log("lestening on port 3000")});
