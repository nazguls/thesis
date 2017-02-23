const axios = require('axios');


const getStockPrice = (ticker) =>
  axios.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json', {
    params: {
      symbol: ticker } })
      .then((response) =>
            response.data
      ).catch((err) => console.log(err));

 const getHistoricalPrices = (ticker, options) => {

let currentDate = new Date();
let startDate = new Date();
let numPeriods = options.numperiods;
if(options.type === 'day') {
  startDate.setDate(startDate.getDate() - numPeriods);
}
else if(options.type === 'month') {
  startDate.setMonth(startDate.getMonth() - numPeriods);
}
else if(options.type === 'year') {
  startDate.setFullYear(startDate.getFullYear() - numPeriods);
}
else if(options.type === 'week') {
  startDate.setDate(startDate.getDate() - (numPeriods * 7));
}

let startMonth = startDate.getMonth()+1;
let endMonth = currentDate.getMonth()+1;

let startMonthFormatted = startMonth + 1 > 9 ? startMonth :
  '0' + startMonth;

  let startDayFormatted = startDate.getDate() > 9 ? startDate.getDate() :
  '0' + startDate.getDate();

let formattedStart = startDate.getFullYear()+'-'+startMonthFormatted+'-'+startDayFormatted+'T00:00:00-00';


let currentMonth = endMonth + 1 > 9 ? endMonth :
  '0' + endMonth;

let formatCurrentDay = currentDate.getDate() > 9 ? currentDate.getDate() : '0' + currentDate.getDate();

let formattedCurrent = currentDate.getFullYear()+'-'+currentMonth+'-'+formatCurrentDay+'T00:00:00-00';
//2011-03-01T00:00:00-00
console.log('start: ', formattedStart);
console.log('end: ', formattedCurrent);
console.log('type: ', options.type);

// > a.getFullYear()
// 2017
 // startDate.setFullYear(startDate.getFullYear() - 2)

// var d = new Date();
// d.setDate(d.getDate() - 2);
// > a.getMonth()
// 1
// > a.setMonth(a.getMonth() - 2)
// 1482455475157

 //{ period: 'historical', numperiods: '55', type: 'day' }
  const inputOptions = { params:
  { parameters: { "Normalized": false, "StartDate":
    formattedStart , "EndDate": formattedCurrent,
    "DataPeriod": options.type, "Elements":[ {"Symbol": ticker, "Type": "price", "Params":["c"]}]}}}

  return axios.get('http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json', inputOptions)
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
          resultArray = port;
          return fetchPrices(port, increment, resultArray);
        });
      };
      return fetchPrices(holdings, null, stocks);
    };

module.exports = { getBulkStockPrices, getStockPrice, getHistoricalPrices };
