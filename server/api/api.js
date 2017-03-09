const router = require('express').Router();
const stocks = require('./stocks/stocksRoutes');
const portfolio = require('./portfolio/portfolioRoutes');
const users = require('./users/usersRoutes');
const money = require('./money/moneyRoutes');
const news = require('./news/newsRoutes');
const sentiment = require('./sentimentAnalysis/sentimentAnalysisRoutes');
const transaction = require('./transact/transactionRoutes');
// const test = require('./test');

router.use('/portfolio', portfolio);
router.use('/stocks', stocks);
router.use('/users', users);
router.use('/money', money);
router.use('/news', news);
router.use('/sentiment', sentiment);
router.use('/transaction', transaction);
// router.use('/test', test);

// });

module.exports = router;
