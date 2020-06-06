'use strict';

const logger = require('../../common-log')();

async function buildImage (config, files) {
  return new Promise((resolve, reject) => {
    let imageId;

    logger.info('Building Docker Image');
    config.dockerClient.buildImage({
      context: process.cwd(),
      src: files
    }, {
      t: `${config.projectName}`, // probably make this the package name and something for the version other than latest?
      q: false // true supresses verbose output
    }, function (error, stream) {
      if (error) return reject(error);

      stream.on('data', function (chunk) {
        const chunkAsString = chunk.toString('utf8').trim();
        logger.trace(chunkAsString);
        // Find the output that has the image id sha
        if (chunkAsString.includes('sha')) {
          // Parse that into JSON
          const parsedChunk = JSON.parse(chunkAsString);
          let imageSHA;
          // Depending on if we have verbose output on or off, the location of the sha is differnt
          // We might be able to do something more clever to find it
          if (parsedChunk.aux) {
            imageSHA = parsedChunk.aux.ID;
          } else {
            imageSHA = parsedChunk.stream;
          }

          // Make sure there is no extra blank characters
          imageId = imageSHA.split(':')[1].trim();
        }
      });

      stream.on('end', function () {
        return resolve(imageId);
      });
    });
  });
}

async function tagImage (config, imageId) {
  // Get an Image object
  const image = config.dockerClient.getImage(config.projectName);
  const result = await image.tag({ repo: config.projectName, tag: imageId });

  logger.trace(`Tagged Image as ${imageId}`);

  return result;
}

module.exports = {
  buildImage,
  tagImage
};
