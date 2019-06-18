var router = require('express').Router();
var controller = require('./jobsController.js');

router
  .route('/jobs')
  .get(controller.getAllJobs)
  .post(controller.createNewJobs);

router
  .route('/jobs/id/:urlID')
  .get(controller.getSingleJob)
  .put(controller.updateJob)
  .delete(controller.deleteJob);

module.exports = router;
