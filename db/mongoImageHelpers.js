var images = require('./mongoInit.js').images;

module.exports = {
  add: (jobID, url, size) => {
    return images.create({ jobID: jobID, imageURL: url, imageSize: size });
  },
  findLargest: jobID => {
    return images
      .find({ jobID })
      .sort({ imageSize: -1 })
      .limit(1);
  }
};
