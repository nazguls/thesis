var fetchStock = require('../utils/apiHelpers.js').getStockPrice;


exports.get = (req, res) => {
  const stock = req.params;
  //const transact = req.query;
  fetchStock(stock).then((data) => {
    console.log('8 ------- from stocksController')
    res.status(200).send(data);
  }).catch((err) => {
    res.status(404).send('Your fetch failed')
  });

}

exports.post = (req, res) => {
  //put information into the DB

// POST api/stocks/:stockticker?transact=sell&userId=someuserid&price=123
// POST api/stocks/:stockticker?transact=buy&userId=someuserid&price=321
  res.status(200).send('this is the response from in your stocksController POST request');

}