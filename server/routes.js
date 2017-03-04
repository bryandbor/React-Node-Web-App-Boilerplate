var router = require('express').Router({ mergeParams: true });

// Set route files/handlers here
router.use('/test', require('./routes/test'));

module.exports = router;