const router = require('express').Router();
const portfolio = require('./portfolioController');

router.route('/:email').get(portfolio.get);

module.exports = router;
