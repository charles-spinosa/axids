const Queue = require('bull');
const jobsQueue = new Queue('jobsQueue');

jobsQueue.process(async (job, done) => {
  console.log('hello from worker\n\n', job.data.job);
  done();
});
