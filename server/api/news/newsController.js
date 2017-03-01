var googleFinance = require('google-finance');

exports.get = (req, res) => {
  googleFinance.companyNews({
  symbol: 'NASDAQ:' + req.url.slice(1)
	}, function (err, news) {
		res.send(news);
	});
};

