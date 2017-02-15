var express = require('express');

app = express();


app.use('/', express.static(__dirname + '/../client/dist'));

app.listen(3000, function() {
  console.log('listening on port 3000');
});