"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var db_config = require("./configure/db_config");
var db = require("./models/index");
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
db.mongoose
    .connect("mongodb://" + db_config.HOST + ":" + db_config.PORT + "/" + db_config.DB, options)
    .then(function () {
    console.log("Successfully connected to MongoDB.");
})["catch"](function (err) {
    console.error("Connection error", err);
    process.exit();
});
var corsOption;
corsOption = { origin: "http://localhost:3000" };
//cors is checking the http request maching with the route.
app.use(cors(corsOption));
// parse requests of content-type - application/json.
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.json({ message: "developing backend" });
});
require('./routes/auth_routes')(app);
require('./routes/user_routes')(app);
require("./routes/todo_routes")(app);
app.listen(3000, function () { console.log("lestening on port 3000"); });
