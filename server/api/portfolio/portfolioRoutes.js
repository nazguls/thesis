const router = require('express').Router();
const portfolio = require('./portfolioController');

router.route('/').get(portfolio.get);
//router.route('/:stock').get(stock.get);

module.exports = router;