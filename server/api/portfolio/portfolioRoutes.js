const router = require('express').Router();
const portfolio = require('./portfolioController');

router.route('/:email').get(portfolio.get);
router.route('/:email').post(portfolio.post);

module.exports = router;
