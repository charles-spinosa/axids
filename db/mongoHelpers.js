const jobs = require('./mongoInit.js');

module.exports = {
  createOne: () => {},
  createMany: () => {},
  readOne: () => {},
  readAll: () => {
    return jobs.find({});
  },
  updateOne: () => {},
  deleteOne: () => {}
};
