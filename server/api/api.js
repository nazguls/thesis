const router = require('express').Router();
const stocks = require('./stocks/stocksRoutes');
const portfolio = require('./portfolio/portfolioRoutes');
const users = require('./users/usersRoutes');
const money = require('./money/moneyRoutes');


router.use('/portfolio', portfolio);
router.use('/stocks', stocks);
router.use('/users', users);
router.use('/money', money);


module.exports = router;
