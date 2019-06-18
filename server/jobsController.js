var helpers = require('../db/mongoHelpers.js');

module.exports = {
  getAllJobs: (req, res) => {
    console.log('hello world');
    res.status(200).send('hello from /jobs GET');
  },
  createNewJobs: (req, res) => {
    //expects an array of URL strings
    res.status(200).send('hello from /jobs POST');
  },
  getSingleJob: (req, res) => {
    res.status(200).send('hello from /jobs/id/# GET');
  },
  updateJob: (req, res) => {
    res.status(200).send('hello from /jobs/id/# PUT');
  },
  deleteJob: (req, res) => {
    res.status(200).send('hello from /jobs/id/# DELETE');
  }
};
