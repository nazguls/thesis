const router = require('express').Router();
const portfolio = require('./portfolioController');

router.route('/:username').get(portfolio.get);

module.exports = router;
