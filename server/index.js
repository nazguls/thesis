var express = require('express');

app = express();

//route to the landing page
app.use('/',
  express.static('/Users/michaelcomes/Desktop/HR52/Thesis/thesis/')
);

  //express.static(__dirname +'../index.html'));

app.listen(3000, function() {
  console.log('listening on port 3000');
});