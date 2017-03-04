var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function (dbName) {
	mongoose.connect('mongodb://localhost:27017/' + dbName);

	var db = mongoose.connection;

	db.once('open', function(){
		console.log('Database connected');
		// do anything that needs to be done with the database
	});
	db.on('error', function(err){
		console.warn('Error:', err);
	});

	return db;
};