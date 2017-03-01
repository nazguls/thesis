const router = require('express').Router();
const sentiment = require('./sentimentAnalysisController');

router.route('/sentimentAnalysis').get(sentiment.get);


module.exports = router;
