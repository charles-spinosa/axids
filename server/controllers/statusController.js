const mongoHelpers = require('../../db/mongoHelpers.js');
const imageHelpers = require('../../db/mongoImageHelpers.js');
const Queue = require('bull');
const jobsQueue = new Queue('jobsQueue');

module.exports = {
  enqueueJob: (req, res) => {
    mongoHelpers
      .updateOne(req.params.jobID, {
        status: 'queued',
        lastUpdated: Date.now()
      })
      .then(async data => {
        try {
          let job = await jobsQueue.add({
            job: data
          });

          res.status(200).send(`job ${req.params.jobID} queued`);
        } catch (err) {
          res.status(500).send('failed to enqueue job');
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('failed to enqueue job');
      });
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
    imageHelpers
      .findLargest(req.params.jobID)
      .then(data => res.status(200).json(data))
      .catch(err => {
        console.log(err);
        res.status(500).send('failed to retrieve job result');
      });
  }
};
