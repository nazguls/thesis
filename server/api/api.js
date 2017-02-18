const router = require('express').Router();
const stocks = require('./stocks/stocksRoutes');


router.use('/stocks', stocks);

module.exports = router;