const axios = require('axios');


const getStockPrice = (ticker) =>
  axios.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json', {
    params: {
      symbol: ticker } })
      .then((response) =>
            response.data
      ).catch((err) => console.log(err));

 const getHistoricalPrices = (ticker, options) => {
 //day month week
let currentDate = new Date();
let endDate = new Date();
let numPeriods = options.numperiods;
if(options.type === 'day') {
  endDate.setDate(endDate.getDate() - numPeriods);
}
else if(options.type === 'month') {
  endDate.setMonth(endDate.getMonth() - numPeriods);
}
else if(options.type === 'year') {
  endDate.setFullYear(endDate.getFullYear() - numPeriods);
}
else if(options.type === 'week') {
  endDate.setDate(endDate.getDate() - (numPeriods * 7));
}
// > a.getFullYear()
// 2017
// > a.setFullYear(a.getFullYear() - 2)

// var d = new Date();
// d.setDate(d.getDate() - 2);
// > a.getMonth()
// 1
// > a.setMonth(a.getMonth() - 2)
// 1482455475157

 //{ period: 'historical', numperiods: '55', type: 'day' }
 const inputOptions = { params:
  { parameters: { "Normalized": false, "StartDate": currentDate , "EndDate": endDate, "DataPeriod": options.type, "Elements":[{"Symbol": ticker, "Type": "price", "Params":["c"]}]}}}

  return axios.get('http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json', options)
  .catch(err => console.log('20', err));
};

// http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"AAPL","Type":"price","Params":["c"]}]}

 const getBulkStockPrices = (portfolio) => {
    const holdings = portfolio.map(stock => {
      return { 'symbol': stock.dataValues.stockSymbol,
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
