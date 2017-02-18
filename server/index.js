const express = require('express');
const app = express();
const api = require('./api/api');


//route to the landing page


//instance middleware
require('./middleware/middleware')(app);

app.use('/api', api);

app.use('/', express.static('.'));

app.listen(3000, function() { console.log('listening on port 3000'); });