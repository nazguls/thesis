const axios = require('axios');

const apiKey = 'e90b85c6-3c34-453f-ae85-51b56066903c';
exports.get = (req, res) => {
	console.log('whats in reqbody', req.body);
	axios.get('https://api.havenondemand.com/1/api/async/analyzesentiment/v2', {
		params: {
			apiKey,
			text: req.body.params
		}
	}).then(jobIdObj => {
		//w-eu_a62868f5-f788-4a92-8666-2d92a74b4f9f
		axios.get('https://api.havenondemand.com/1/job/result/' + jobIdObj.data.jobID + '?apiKey=' + apiKey)
		.then((result) => {
			console.log(result.data);
			res.send(result.data);
		});
	});
};

