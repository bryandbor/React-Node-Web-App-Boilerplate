var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_NAME = require('./constants/db').DB_NAME;
mongoose.connect('mongodb://localhost:27017/' + DB_NAME);
var db = mongoose.connection;

db.once('open', function(){
	// do anything that needs to be done with the database
});
db.on('error', function(err){
	console.log('Error:', err);
});

exports.db = db;