// Dependencies
var express = require('express'),
	bodyParser = require('body-parser');

const DB_NAME = 'DB_NAME_HERE';
var app = express();
let db = null;

app.use(function (req, res, next) {
	db = require('./connect')(DB_NAME);
	
  // action after response
  var afterResponse = function() {
    // any other clean ups
    mongoose.connection.close(function () {
      console.log('Mongoose connection disconnected');
    });
  }
  
  // hooks to execute after response
  res.on('finish', afterResponse);
  res.on('close', afterResponse);

  // do more stuff

  next();
});

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