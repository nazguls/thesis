const express = require('express');

const app = express();
const api = require('./api/api');
const db = require('../db/dbModels');
const path = require('path');


require('./middleware/middleware')(app);

//Adam's docker-testing endpoint
app.use('/adam', (req, res) => res.send('Hi Adam. Michael Comes is an amazing genius'));

console.log();

app.use('/api', api);

app.use('/', express.static(path.resolve(__dirname, '../landing/home')));

app.use('/assets', express.static(path.resolve(__dirname, '../landing/assets')));

app.use('/dist', express.static(path.resolve(__dirname, '../landing/dist')));

app.use('/landing', express.static(path.resolve(__dirname, '../landing/dist/css')));

app.listen(3000, () => console.log('listening on port 3000'));
