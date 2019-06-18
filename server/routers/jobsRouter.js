var router = require('express').Router();
var controller = require('../controllers/jobsController.js');

router
  .route('/')
  .get(controller.getAllJobs)
  .post(controller.createNewJobs);

router
  .route('/id/:objID')
  .get(controller.getSingleJob)
  .put(controller.updateJob)
  .delete(controller.deleteJob);

module.exports = router;
