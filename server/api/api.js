const router = require('express').Router();
const stocks = require('./stocks/stocksRoutes');
const portfolio = require('./portfolio/portfolioRoutes');
const users = require('./users/usersRoutes');
const money = require('./money/moneyRoutes');
const test = require('./test');

router.use('/portfolio', portfolio);
router.use('/stocks', stocks);
router.use('/users', users);
router.use('/money', money);

router.use('/test', test);

// });

module.exports = router;
