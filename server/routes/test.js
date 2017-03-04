var router = require('express').Router({ mergeParams: true });
var cors = require('cors');

router.options('/', cors());
router.get('/', cors(), (req, res, next) => {
	res.json({
		success: true
	});
});

module.exports = router;