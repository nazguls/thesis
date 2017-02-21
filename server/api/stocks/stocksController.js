const apiHelper = require('../utils/apiHelpers');
const dbHelper = require('../utils/dbHelpers');

exports.get = (req, res) => {
  const stock = req.params.stock;
  apiHelper.getStockPrice(stock).then((data) => {
    res.status(200).send(data);
  }).catch((err) => {
    res.status(404).send(err);
  });
};

exports.post = (req, res) => {
  const order = req.query;
  const tradeData = Object.assign(req.query, req.params);
  console.log(order);
  dbHelper.transact(tradeData)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(200).send(err));
  };

// POST api/stocks/:stockticker?transact=sell&userId=someuserid&price=123&shares=NUM_SHARES
// POST api/stocks/:stockticker?transact=buy&userId=someuserid&price=321&shares=NUM_SHARES

