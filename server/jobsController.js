var helpers = require('../db/mongoHelpers.js');

module.exports = {
  getAllJobs: (req, res) => {
    helpers
      .readAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('could not retrieve jobs');
      });
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
