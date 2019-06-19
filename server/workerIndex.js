const Queue = require('bull');
const jobsQueue = new Queue('jobsQueue');
const request = require('request-promise-native');
const Cheerio = require('cheerio');

const grabImages = url => {
  return request(url).then(data => {
    $ = Cheerio.load(data);
    $ = $('img');
    console.log($);
    return $;
  });
};

jobsQueue.process(async (job, done) => {
  console.log('hello from worker', job.data.job);
  grabImages(job.data.job.url)
    .then($ => done())
    .catch(err => console.log(err));
});
