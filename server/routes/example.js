'use strict';

var router = require('express').Router(),
	cors = require('cors'),
	Example = require('../models/Example');

/*----------  v1/Examples endpoints  ----------*/

router.options('/', cors());
/* Retrieve all Examples */
router.get('/', cors(), function(req, res){
	Example.findAll(function(err, contacts){
		if (err)
			res.json({
				success: false,
				error: err
			});
		
		else
			res.json({
				success: true,
				contacts: contacts,
				count: contacts.length
			});
	});
});

/* Create a new Example */
router.post('/', cors(), function(req, res){
	var newExample = new Example({
		first_name: req.body.first_name,
		middle_names: req.body.middle_names,
		last_name: req.body.last_name
	});

	newExample.save(function(err, contact){
		if (err) {
			res.json({
				success: false,
				error: err
			});
		} else {
			res.json({
				success: true,
				contact: contact
			});
		}
	});
});

/*----------  v1/Examples/:uid endpoints  ----------*/
router.options('/:cid', cors());
/* Retreive a single Example */
router.get('/:cid', cors(), function(req, res){
	Example.findById(req.params.cid, function(err, contact){
		if (err)
			res.json({
				success: false,
				error: err
			});
		
		else if (! contact)
			res.json({
				success: false,
				error: 'Example not found'
			});

		else
			res.json({
				success: true,
				contact: contact
			});
	});
});

/* Moidfy a single Example */
router.put('/:cid', cors(), function(req, res){
	Example.update({
		_id: req.params.cid
	}, req.body, function(err, contact){
		if (err)
			res.json({
				success: false,
				error: err
			});
		
		else
			res.json({
				success: true,
				contact: req.body
			});
	});
});

/* Delete a single Example */
router.delete('/:cid', function(req, res){
	Example.remove({
		_id: req.params.cid
	}, function(err){
		if (err)
			res.json({
				success: false,
				error: err
			});

		else
			res.json({
				success: true
			});
	});
});

router.use('/:cid/example', require('./example/example'));


module.exports = router;