// Dependencies
var express = require('express'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	expressValidator = require('express-validator'),
	session = require('express-session'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var db = require('./connect').db;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
	secret: 'secret',
	saveUninitialized: false,
	resave: true
}));

// Error formatter
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Route handlers
app.use('/error', require('./routes/error'));
app.use('/example', require('./routes/example'));

app.get('/', function(req, res){
	res.json({
		success: true,
		response: 'Hello World!'
	});
});

app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function(){
	console.log('App ready on port ' + app.get('port'));
});