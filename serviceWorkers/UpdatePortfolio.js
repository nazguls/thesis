const mysql = require('mysql');
const Promise = require('bluebird');
const axios = require('axios');

Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" +
    twoDigits(1 + this.getUTCMonth()) + "-" +
    twoDigits(this.getUTCDate()) + " " +
    twoDigits(this.getUTCHours()) + ":" +
    twoDigits(this.getUTCMinutes()) + ":" +
    twoDigits(this.getUTCSeconds());
};
function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:'cywdb'
});

connection.connect();

connection.queryAsync('select * from Users').then(data => {
  let ids = data.map(val => val.id);

  console.log('24', ids);
var getId = function(inputId, idCounter) {
  console.log('36', inputId);
  connection.queryAsync('SELECT stockSymbol, numOfShares, id FROM Stocks INNER JOIN Userstocks ON Stocks.id = Userstocks.StockId WHERE Userstocks.UserId = ?', inputId).then(data => {
    console.log('28', data);
  if (data.length !== 0) {
    //console.log('28', data.length);
    let sum = 0;

    var recurse = (stock, counter) => {
        //let sum = 0;
      getPrice(stock.stockSymbol, stock.numOfShares)
        .then(total => {
            sum += total;
            counter +=1;
            if(counter < data.length) {
               recurse(data[counter], counter)
            }
            else {
                console.log('53', sum);
                idCounter++;
                connection.queryAsync('select id, portfolioValue, cash from (select id, portfolioValue, cash from portfolios inner join userportfolios on userportfolios.PortfolioId = Portfolios.id where userportfolios.UserId = ?) as T', inputId)
                  .then(portfolioData=> {
                    console.log('46', portfolioData);
                    //user's most recent portfolio;

                    let cash = portfolioData[portfolioData.length - 1].cash;
                    let portId = portfolioData[portfolioData.length - 1].id;
                    let now = new Date().toMysqlFormat();
                    connection.queryAsync('UPDATE portfolios SET portfolioValue = ?, cash = ? where id= ?', [sum, cash, portId]).then(updatedPortfolio => {
                      console.log('66', updatedPortfolio);
                      let insertId =  updatedPortfolio.insertId;
                      //console.log('63', updatedPortfolio);
                    let now = new Date().toMysqlFormat();
                    connection.queryAsync('INSERT into portfolios \
                    (date, portfolioValue, cash, createdAt, updatedAt) select date, portfolioValue, cash, createdAt, updatedAt  from portfolios where id = ?', portId)
                    .then(update => {
                       let insertId = update.insertId;
                       connection.queryAsync('UPDATE portfolios SET date = ? where \
                        id= ?', [now, insertId])
                       .then(() => {

                       connection.queryAsync('INSERT INTO userportfolios \
                       SET UserId = ?, PortfolioId = ?, createdAt =?, updatedAt=? ', [inputId, insertId, now, now]).then(stuff => {console.log('76', stuff)});
                    });
                     });
                  });
                });
               //idCounter++;
               if (idCounter < ids.length) {
                 //console.log('82', idCounter);
                 getId(ids[idCounter], idCounter);
              }
            }
          });            //now we have our total MV for that stock
    };
    recurse(data[0], 0);
  }
 });
};
  getId(ids[0], 0);

});

var getPrice = ((symbol, shares) => {


  return axios.get(`http://dev.markitondemand.com/Api/v2/Quote/json?symbol=${symbol}`).then((stock, err) =>
      {
        let price = stock.data.LastPrice;
        let total = price * shares;
        console.log('83', total, ' ', symbol);
        return total;
      }).catch(err => {
               console.log(err);
        return 1;
      })
});








