var express = require("express");

var bodyParser = require("body-parser");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
//this 14 also takes some form in json format and make them pretty to use in routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
var mysql = require("mysql");
//set up connection and starting mySQL server
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "task_saver_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Root get route
//This route retrieves informstion from the server
app.get("/", function(req, res) {
  connection.query("SELECT * FROM tasks;", function(err, data) {
    if (err) throw err;

    // Test it
    // console.log('The solution is: ', data);

    // Test it
    // return res.send(data);

    //res.render is to render and send tasks back to client
    res.render("index", { tasks: data });
  });
});

// Post route -> back to home
app.post("/", function(req, res) {
  // 

  // When using the MySQL package, we use ?s in place of any values to be inserted, which are then swapped out with corresponding elements in the array
  // The ? helps us prevent  SQL injection 
  
  connection.query("INSERT INTO tasks (task) VALUES (?)", [req.body.task], function(err, result) {
    if (err) throw err;
//res.direct is ploaced after the the .post information to the server to refresh because we just added new data
    res.redirect("/");
  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
