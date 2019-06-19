const Queue = require('bull');
const jobsQueue = new Queue('jobsQueue');

const Cheerio = require('cheerio');

const grabImages = url => {};

jobsQueue.process(async (job, done) => {
  console.log('hello from worker\n\n', job.data.job);
  done();
});
