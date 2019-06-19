const Queue = require('bull');
const jobsQueue = new Queue('jobsQueue');
const request = require('request-promise-native');
const Cheerio = require('cheerio');
const images = require('../db/mongoImageHelpers.js');
const jobs = require('../db/mongoHelpers.js');

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
        if (tags[key].attribs.src.includes('//')) {
          URLs.push('http:' + tags[key].attribs.src);
        } else if (!tags[key].attribs.src.includes('https')) {
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
      console.log(size);
    })
    .on('end', () => {
      images.add(jobID, url, size);
    });
};

jobsQueue.process(async (job, done) => {
  console.log(
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n',
    job.data.job
  );
  try {
    grabImageURLs(job.data.job.url)
      .then(urlArr => {
        for (let url of urlArr) {
          reviewImage(url, job.data.job._id);
        }
        done();
      })
      .catch(err => console.log(err));
  } catch (err) {
    console.log(err);
    done();
  }
});
