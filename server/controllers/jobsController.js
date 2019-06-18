var helpers = require('../../db/mongoHelpers.js');

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
    //expects req to contain an array of URL strings
    helpers
      .createJob(req.body)
      .then(data => res.status(200).send('job created'))
      .catch(err => {
        console.log(err);
        res.status(500).send('could not add job(s)');
      });
  },
  getSingleJob: (req, res) => {
    helpers
      .readOne(req.params.objID)
      .then(data => res.status(200).json(data))
      .catch(err => {
        console.log(err);
        res.status(500).send('could not find single job');
      });
  },
  updateJob: (req, res) => {
    helpers
      .updateOne(req.params.objID, req.body)
      .then(data => res.status(200).send('job updated'))
      .catch(err => {
        console.log(err);
        res.status(500).send('could not update that job');
      });
  },
  deleteJob: (req, res) => {
    helpers
      .deleteOne(req.params.objID)
      .then(() => res.status(200).send('job deleted'))
      .catch(err => {
        console.log(err);
        res.status(500).send('could not delete that job');
      });
  }
};
