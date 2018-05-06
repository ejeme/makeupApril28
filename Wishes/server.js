var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
//Use bodyparser to make our form dta look nice
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//creat connectrion
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "wishes_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

//set up route
// Root get route.
//Get route reads data and send list back to client
app.get("/", function(req, res) {
  connection.query("SELECT * FROM wishes;", function(err, data) {
    if (err) {
      throw err;
    }

    
console.log('The solution is: ', data);

     
    // res.send(data);

    res.render("index", { wishes: data });
  });
});

// Post route -> back to home
//this takes in data from nuser and inserts it into our wishes table
//? escapes things like scrit tags and html tagsand helps prevent sequel injection
app.post("/", function(req, res) {
  // Test it.
  // console.log('You sent, ' + req.body.wish);

  // Test it.
  // res.send('You sent, ' + req.body.wish)

  connection.query("INSERT INTO wishes (wish) VALUES (?)", [req.body.wish], function(err, result) {
    if (err) {
      throw err;
    }

    res.redirect("/");
  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
