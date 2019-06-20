var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose
  .connect('mongodb://localhost/axiad', { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongo'));

var jobsSchema = new mongoose.Schema({
  url: String, //google.com
  status: String, //not - queued
  largestImageURL: String, // null
  lastUpdated: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() }
  // _id: ObjectID(aaaaaaaaaa)
});

var imagesSchema = new mongoose.Schema({
  jobID: String, //aaaaaaaaaaa
  imageSize: Number, //64k
  imageURL: String // www.cdn.com/photo
});

const jobs = mongoose.model('jobs', jobsSchema);
const images = mongoose.model('images', imagesSchema);

module.exports = { jobs, images };
