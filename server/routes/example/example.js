'use strict';

const CONSTANTS = require('../../constants/server');

var router = require('express').Router({mergeParams: true}),
	cors = require('cors'),
	Example = require('../../models/Example');

/*----------  v1/Examples endpoints  ----------*/

router.options('/', cors());
/* Retrieve all Examples */
router.get('/', function(req, res){
	Example.findByContact(req.params.cid, function(err, emails){
		if (err)
			res.json({
				success: false,
				error: err
			});
		
		else
			res.json({
				success: true,
				emails: emails
			});
	});
});

/* Create a new Example */
router.post('/', cors(), function(req, res){
	var newExample = new Example({
		email: req.body.email,
		type: req.body.type,
		primary: req.body.primary,
		contact: req.params.cid
	});

	newExample.save(function(err, email){
		if (err)
			throw err;

		else 
			res.json({
				success: true,
				email: email
			});
	});
});

/*----------  v1/Examples/:uid endpoints  ----------*/

router.options('/:eid', cors());
/* Retreive a single Example */
router.get('/:eid', function(req, res){
	Example.findById(req.params.eid, function(err, email){
		if (err)
			throw err;
		
		else if (! email)
			res.json({
				success: false,
				error: 'Example not found'
			});
		
		else
			res.json({
				success: true,
				email: email
			});
	});
});

/* Modify a single Example */
router.put('/:eid', cors(), function(req, res){
	Example.update({
		_id: req.params.eid
	}, req.body, function(err, email){
		if (err)
			throw err;

		else
			Contact.update({
				_id: req.params.cid
			}, {
				updated_at: new Date()
			}, function(err){
				if (err)
					throw err;

				res.json({
					success: true,
					email: req.body
				});
			});
	});
});

/* Delete a single Example */
router.delete('/:eid', cors(), function(req, res){
	Example.remove({
		_id: req.params.eid
	}, function(err){
		if (err)
			throw err;
		
		else
			Contact.findById(req.params.cid, function(err, contact){
				contact.emails = contact.emails.filter(function(email){
					return email._id !== req.params.eid;
				}).map(function(email){
					return email._id;
				});
				contact.save(function(err){
					if (err)
						throw err;

					else
						res.json({
							success: true
						});
				});
			});
	});
});

module.exports = router;