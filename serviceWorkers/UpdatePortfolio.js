var mysql = require('mysql');
var fs = require('fs');
var Promise = require("bluebird");
Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
//Promise.promisifyAll(require("mysql/lib/Pool").prototype);

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:'cywdb'
})

connection.connect()

//select the current date portfolio
console.log(new Date());

connection.queryAsync('select * from Users').then(data => {
  let ids = data.map(val => val.id);

  ids.forEach((id) => {
  connection.queryAsync('SELECT stockSymbol, numOfShares, id FROM Stocks INNER JOIN Userstocks ON Stocks.id = Userstocks.StockId WHERE Userstocks.UserId = ?', id).then(data => {
      console.log(data);
  });

 });

});











//api helpers