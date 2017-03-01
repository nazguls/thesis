const axios = require('axios');

const apiKey = 'e90b85c6-3c34-453f-ae85-51b56066903c';
exports.get = (req, res) => {
	axios.get('https://api.havenondemand.com/1/api/async/analyzesentiment/v2', {
		params: {
			apiKey,
			text: 'i like cat'
		}
	}).then(jobIdObj => {
		console.log('jobid', jobIdObj.data.jobID);
		//w-eu_a62868f5-f788-4a92-8666-2d92a74b4f9f
		axios.get('https://api.havenondemand.com/1/job/result/' + jobIdObj.data.jobID + '?apiKey=' + apiKey)
		.then((result) => {
			console.log('result', result.data);
			res.send(result.data);
		});
	});
};

