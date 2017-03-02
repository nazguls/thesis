const express = require('express');

const app = express();
const api = require('./api/api');
const db = require('../db/dbModels');
// const data = require('../db/S&Pdata.txt');
// console.log(data);
// fs.readFile(data, 'utf8', function())

//route to the landing page


//instance middleware
require('./middleware/middleware')(app);

//Adam's docker-testing endpoint
app.use('/adam', (req, res) => res.send('Hi Adam. Michael Comes is an amazing genius'));

app.use('/api', api);

// fs.readFile(path.resolve(__dirname, 'indexData.json'), 'utf8', (err, data) => {
//     var jsonData = JSON.parse(data);
//     //console.log(jsonData);
//     var line = jsonData.map((val, idx) => {
//         if(val.VALUE === ".") {
//           val.VALUE = jsonData[idx - 1].VALUE;
//         }
//         return val;
//       //console.log('30', line);
//     });

//     console.log(line);

//     //var lineStr = newLine.join('\n');
//     //console.log(JSON.parse(line));
//   }
// );



//serve landing page
app.use('/', express.static('.'));

app.listen(3000, () => console.log('listening on port 3000'));
