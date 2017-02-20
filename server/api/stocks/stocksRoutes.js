const router = require('express').Router();
const stock = require('./stocksController');

router.route('/:stock').get(stock.get);
router.route('/:stock').post(stock.post);


module.exports = router;
