const router = require('express').Router();
const stocks = require('./stocks/stocksRoutes');
const portfolio = require('./portfolio/portfolioRoutes');


router.use('/portfolio', portfolio);
router.use('/stocks', stocks);


module.exports = router;