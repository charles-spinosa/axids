const jobs = require('./mongoInit.js');

module.exports = {
  createJob: arr => {
    let jobsArr = arr.map(elem => {
      let result = {
        url: elem,
        status: 'not queued',
        largestImage: null
      };
      return result;
    });
    console.log(jobsArr);
    return jobs.insertMany(jobsArr);
  },
  readOne: objID => {
    return jobs.findById(objID);
  },
  readAll: () => {
    return jobs.find({});
  },
  updateOne: (objID, job) => {
    return jobs.findByIdAndUpdate(objID, job);
  },
  deleteOne: objID => {
    return jobs.findByIdAndDelete(objID);
  }
};
