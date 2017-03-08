const axios = require('axios');
const connection = require('../../../db/dbConnect.js');

const getStockPrice = (ticker) =>
  axios.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json', {
    params: {
      symbol: ticker } })
      .then((response) =>
            response.data
      ).catch((err) => console.log(err));

const getHistoricalPrices = (ticker, options) => {
  console.log('13', options);
  const currentDate = new Date();
  const numPeriods = options.numperiods;
  const period = options.type;
  const startDate = calculateStart(options.type, numPeriods);
  const formattedStart = formatDate(startDate);
  const formattedCurrentDate = formatDate(currentDate);

  const inputOptions = { params:
  { parameters: { "Normalized": false, "StartDate":
    formattedStart , "EndDate": formattedCurrentDate,
    "DataPeriod": period, "Elements":[ {"Symbol": ticker, "Type": options.attributes, "Params": options.attributes === 'price' ? ["c"] : null}]}}};
   if (ticker === 'SPX') {
      return connection.query('SELECT * FROM indexData where date >=  :startDate AND date <= :currentDate', { replacements: {
          startDate: formattedStart,
          currentDate: formattedCurrentDate
        }}).then((results) => {

            return { data: results[0]};
           });
        }
        //WHERE "date" >= \

      else {
    return axios.get('http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json', inputOptions)
    .catch(err => {
    });
   }
};

 const formatDate = (date) => {
   const month = date.getMonth() + 1;
   const monthFormatted = month + 1 > 9 ? month :
     '0' + month;
   const dayFormatted = date.getDate() > 9 ? date.getDate() :
     '0' + date.getDate();
   const formattedDate = date.getFullYear()+'-'+monthFormatted+'-'+dayFormatted+'T00:00:00-00';
   return formattedDate;
  };

 const calculateStart = (period, numPeriods) => {
    const start = new Date();

  if (period === 'day') {
    start.setDate(start.getDate() - numPeriods);
  } else if (period === 'month') {
    start.setMonth(start.getMonth() - numPeriods);
  } else if (period === 'year') {
    start.setFullYear(start.getFullYear() - numPeriods);
  } else if (period === 'week') {
    start.setDate(start.getDate() - (numPeriods * 7));
  }
  return start;
 };


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
