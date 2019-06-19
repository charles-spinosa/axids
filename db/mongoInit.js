var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost/axiad', { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongo'));

var jobsSchema = new mongoose.Schema({
  // urlID: { type: Number, index: -1 },
  url: String,
  status: String,
  largestImageURL: String,
  lastUpdated: { type: Date, default: Date.now() }
});

var imagesSchema = new mongoose.Schema({
  jobID: String,
  imageSize: Number,
  imageURL: String
});

const jobs = mongoose.model('jobs', jobsSchema);

module.exports = jobs;
