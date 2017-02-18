const router = require('express').Router();
const stock = require('./stocksController');

router.route('/:stock').get(stock.get);

module.exports = router;