var router = require('express').Router();
var controller = require('./statusController.js');

router
  .route('/:jobID')
  .post(controller.enqueueJob)
  .get(controller.jobStatus);

router.route('/result/:jobID').get(controller.jobResult);

module.exports = router;
