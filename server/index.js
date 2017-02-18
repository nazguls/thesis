var express = require('express');
var { connection, User, Stock } = require('../db/dbConnection');

app = express();

//route to the landing page
app.use('/', express.static('.'));

 

app.listen(3000, function() {
  console.log('listening on port 3000');
});