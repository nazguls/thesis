//const fetchStock = require('./apiHelpers.js').getstockData;


exports.get = (req, res) => {
  const stockPrice = req.params;
  const transact = req.query;
  console.log('4 req.params', req.params);
  console.log('5 req.query', req.query);
  // http://localhost:3000/api/stocks/appl?query=buy&user=michael
  //trigger some sort of request here
  //   4 req.params { stock: 'appl' }
  // 5 req.query { transact: 'currentprice' }
// GET api/stocks/:stockticker?transact=current
// GET api/stocks/:stockticker?transact=sell&userId=someuserid
// GET api/stocks/:stockticker?transact=buy&userId=someuserid
  res.status(200).send('this is the response from in your stocksController GET request');
}

exports.post = (req, res) => {
  console.log('20: ', req);
  console.log('stock post request');
  res.status(200).send('this is the response from in your stocksController POST request');

}