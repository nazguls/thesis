const axios = require('axios');


const getStockPrice = (ticker) =>
  axios.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json', {
    params: {
      symbol: ticker } })
      .then((response) => {
           return response.data;
         }
      ).catch((err) => console.log('12', err));

 const getHistoricalPrices = (ticker) => console.log('getHistoricalPrices', ticker);


// http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"AAPL","Type":"price","Params":["c"]}]}

 const getBulkStockPrices = (portfolio) => {
    const holdings = portfolio.map(stock =>
       { return  { 'symbol' : stock.dataValues.stockSymbol,
        'numOfShares': stock.dataValues.numOfShares, 'currentPrice': null, 'marketValue': null}
      }
    );
    const stocks = [];
    const fetchPrices = (port, counter, results) => {
      let increment = counter;
      let resultArray = results;
      if (increment === null) {
        increment = 0;
      } else {
        increment++;
      }
      if (increment === port.length) {
        return resultArray;
      }
      return getStockPrice(port[increment].symbol)
        .then(stock => {
          port[increment].currentPrice = stock.LastPrice;
          port[increment].marketValue = stock.LastPrice *
          port[increment].numOfShares;
          console.log('38', port);
          resultArray = port;
          return fetchPrices(port, increment, resultArray);
        });
      };
      console.log('44', holdings);
      return fetchPrices(holdings, null, stocks);
    };

module.exports = { getBulkStockPrices, getStockPrice, getHistoricalPrices };
