var router = require('express').Router();
var controller = require('../controllers/statusController.js');

router
  .route('/:jobID')
  .post(controller.enqueueJob)
  .get(controller.jobStatus);

router.route('/:jobID/result').get(controller.jobResult);

module.exports = router;
