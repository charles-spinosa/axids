var router = require('express').Router();
var jobsRouter = require('./jobsRouter.js');
var statusRouter = require('./statusRouter.js');

router.use('/jobs', jobsRouter);
router.use('/status', statusRouter);

module.exports = router;
