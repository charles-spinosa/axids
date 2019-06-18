var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost/axiad', { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongo'));

var jobsSchema = new mongoose.Schema({
  // urlID: { type: Number, index: -1 },
  url: String,
  status: String,
  largestImage: String
});

const jobs = mongoose.model('jobs', jobsSchema);

module.exports = jobs;
