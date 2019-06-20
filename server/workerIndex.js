const Queue = require('bull');
const jobsQueue = new Queue('jobsQueue');
const request = require('request-promise');
const Cheerio = require('cheerio');
const images = require('../db/mongoImageHelpers.js');
const jobs = require('../db/mongoHelpers.js');
const bluebird = require('bluebird');

const grabImageURLs = url => {
  let baseURL = '';
  let idxOfSlash = -1;
  for (let i = 0; i < 3; i++) {
    idxOfSlash = url.indexOf('/', idxOfSlash + 1);
  }
  baseURL = url.substring(0, idxOfSlash);
  console.log('baseURL: ', baseURL);
  return request(url).then(data => {
    $ = Cheerio.load(data);
    tags = $('img');
    // console.log(tags);
    let URLs = [];
    for (let key in tags) {
      if (tags[key].type === 'tag' && tags[key].name === 'img') {
        if (
          tags[key].attribs.src.includes(
            '//' && !tags[key].attribs.src.includes('http')
          )
        ) {
          URLs.push('http:' + tags[key].attribs.src);
        } else if (!tags[key].attribs.src.includes('http')) {
          URLs.push(baseURL + tags[key].attribs.src);
        } else {
          URLs.push(tags[key].attribs.src);
        }
      }
    }
    console.log('URLs: ', URLs);
    return URLs;
  });
};

const reviewImage = (url, jobID) => {
  let size = 0;
  return request
    .get(url)
    .on('data', chunk => {
      size += chunk.length;
    })
    .then(() => {
      console.log(size);
      images.add(jobID, url, size);
    });
};

jobsQueue.process((job, done) => {
  console.log(
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n',
    job.data.job
  );
  try {
    grabImageURLs(job.data.job.url)
      .then(urlArr => {
        if (urlArr.length === 0) {
          jobs.updateOne(job.data.job._id, { status: 'no images' }).then(done);
        } else {
          let promArr = urlArr.map(elem => reviewImage(elem, job.data.job._id));
          bluebird
            .all(promArr)
            .then(() => images.findLargest(job.data.job._id))
            .then(largest => {
              console.log('jobID: ', job.data.job._id);
              jobs
                .updateOne(job.data.job._id, {
                  status: 'finished',
                  largestImageURL: largest[0].imageURL
                })
                .then(() => {
                  console.log('all writes complete');
                  done();
                });
            })
            .catch(err => {
              console.log(err);
              jobs
                .updateOne(job.data.job._id, {
                  status: 'error storing results'
                })
                .then(() => done());
            });
        }
      })
      .catch(err => {
        console.log(err);
        jobs.updateOne(job.data.job._id, { status: 'URL error' }).then(done);
      });
  } catch (err) {
    console.log(err);
    jobs
      .updateOne(job.data.job._id, { status: 'error grabbing URLs' })
      .then(done);
  }
});
