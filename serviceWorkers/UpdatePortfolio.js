var mysql = require('mysql');
var fs = require('fs');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:'cywdb'
})

connection.connect(function(data, err) {console.log(data, err)});

//select the current date portfolio
console.log(new Date());

connection.query('select * from Portfolios', function(err, data) {



  fs.writeFile(__dirname +'/text.txt', JSON.stringify(data))

});
