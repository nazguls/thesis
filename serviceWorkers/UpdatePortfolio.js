const mysql = require('mysql');
const Promise = require('bluebird');
const axios = require('axios');
const CronJob = require('cron').CronJob;
const fs = require('fs');

Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + '-' +
    twoDigits(1 + this.getUTCMonth()) + '-' +
    twoDigits(this.getUTCDate()) + ' ' +
    twoDigits(this.getUTCHours()) + ':' +
    twoDigits(this.getUTCMinutes()) + ':' +
    twoDigits(this.getUTCSeconds());
};
function twoDigits(d) {
    if (0 <= d && d < 10) return '0' + d.toString();
    if (-10 < d && d < 0) return '-0' + (-1 * d).toString();
    return d.toString();
}

const job = new CronJob('* * 14 * * 1-5', () => {
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cywdb'
});

connection.connect();

connection.queryAsync('select * from Users').then(userData => {
  const ids = userData.map(val => val.id);

const getId = function (inputId, idCounter) {
  let idCounterVar = idCounter;
  connection.queryAsync('SELECT stockSymbol, numOfShares, id FROM Stocks INNER JOIN Userstocks ON Stocks.id = Userstocks.StockId WHERE Userstocks.UserId = ?', inputId).then(data => {
  if (data.length !== 0) {
    let sum = 0;

    const recurse = (stock, counter) => {
        let counterVar = counter;
      getPrice(stock.stockSymbol, stock.numOfShares)
        .then(total => {
            sum += total;
            counterVar += 1;
            if (counterVar < data.length) {
               recurse(data[counterVar], counterVar);
            } else {
                idCounterVar++;
                connection.queryAsync('select id, portfolioValue, cash from (select id, portfolioValue, cash from portfolios inner join userportfolios on userportfolios.PortfolioId = Portfolios.id where userportfolios.UserId = ?) as T', inputId)
                  .then(portfolioData => {
                    const cash = portfolioData[portfolioData.length - 1].cash;
                    const portId = portfolioData[portfolioData.length - 1].id;
                    connection.queryAsync('UPDATE portfolios SET portfolioValue = ?, cash = ? where id= ?', [sum, cash, portId]).then(updatedPortfolio => {
                      console.log('66', updatedPortfolio);
//                      const insertId =  updatedPortfolio.insertId;
                      //console.log('63', updatedPortfolio);
                    const now = new Date().toMysqlFormat();
                    connection.queryAsync('INSERT into portfolios \
                    (date, portfolioValue, cash, createdAt, updatedAt) select date, portfolioValue, cash, createdAt, updatedAt  from portfolios where id = ?', portId)
                    .then(update => {
                       const insertId = update.insertId;
                       connection.queryAsync('UPDATE portfolios SET date = ? where \
                        id= ?', [now, insertId])
                       .then(() => {
                       connection.queryAsync('INSERT INTO userportfolios SET UserId = ?, PortfolioId = ?, createdAt \
                     =?, updatedAt=? ', [inputId, insertId, now, now]);
                    });
                     });
                  });
                });
               //idCounter++;
               if (idCounterVar < ids.length) {
                 //console.log('82', idCounter);
                 getId(ids[idCounterVar], idCounterVar);
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
}, null, true, 'America/Los_Angeles');

job.start();

const getPrice = ((symbol, shares) =>
   axios.get(`http://dev.markitondemand.com/Api/v2/Quote/json?symbol=${symbol}`).then((stock) => {
        const price = stock.data.LastPrice;
        const total = price * shares;
        return total;
      }).catch(err =>
        fs.open('./errorLog.txt', 'r+', (error, id) =>
          fs.write(`${id} ${err}\r\n'`, 'utf8', () =>
            fs.close(() => console.log('error logged'))
          ))
      )
);
