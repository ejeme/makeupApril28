# makeupApril28
var PORT = process.env.PORT 
its important to have the .env so it can load on heroku

varm exphbs = require("express-handlebars)
Is required so we can use handlebars in our app

{{   handle bar inserts javasript that is string}}

{{{ handlebar inserts html }}}

#each is used in the handlebar files (main and index .handlebars)

CSS is included in the layout file(main.handlebar)

PUT request is used to updte a row in a database
Best practice is to only use GET request to retrieve information.

A GET route send requestm to the server and gets response back

POST route posts information and its created in the server

PUT route Updates resource on the server

Delete:deletes resource on the server