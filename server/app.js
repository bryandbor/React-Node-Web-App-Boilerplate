// Dependencies
var express = require('express'),
	bodyParser = require('body-parser');

var app = express();
var db = require('./connect')('DB_NAME');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route handlers
app.use(require('./routes'))

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
  	success: false,
  	error: err.message
  });
});

app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function(){
	console.log('App ready on port ' + app.get('port'));
});