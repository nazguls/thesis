const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cywdb'
});

//connection.connect();
connection.query('create table indexData (date DATE, value INTEGER)');

fs.readFile(path.resolve(__dirname, 'indexData.json'), 'utf8', (err, data) => {
    const jsonData = JSON.parse(data);
    const dataValues = [];
    jsonData.forEach((val, idx) => {
        if (val.VALUE === '.') {
          val.VALUE = jsonData[idx - 1].VALUE;
        }
        dataValues.push([val.DATE, val.VALUE]);
    });
    const queryStr = 'INSERT INTO indexData (date, value) VALUES ?';
    connection.query(queryStr, [dataValues], (error) => {
      if (err) {
        console.log(error);
      }
      connection.end();
    });
  }
);
