const router = require('express').Router();
const sentiment = require('./sentimentAnalysisController');

router.route('/sentimentAnalysis').post(sentiment.get);


module.exports = router;
