const mongoHelpers = require('../../db/mongoHelpers.js');

module.exports = {
  enqueueJob: (req, res) => {
    //redisJobQueue.push(mongo.find(req.params.jobID))
  },
  jobStatus: (req, res) => {
    mongoHelpers
      .readOne(req.params.jobID)
      .then(data => {
        res.status(200).send(data.status);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('failed to retrieve job status');
      });
  },
  jobResult: (req, res) => {
    mongoHelpers
      .readOne(req.params.jobID)
      .then(data => {
        res.status(200).send(data.largestImage);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('failed to retrieve job result');
      });
  }
};
