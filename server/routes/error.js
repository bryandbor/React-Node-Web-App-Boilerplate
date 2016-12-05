'use strict';

const CONSTANTS = require('../constants/server');

var router = require('express').Router();

/*----------  v1/error endpoints  ----------*/
router.get('/', function(req, res){
	res.json({
		success: false,
		error: 'error'
	});
});

module.exports = router;