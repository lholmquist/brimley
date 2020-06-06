'use strict';

// This is the build goal
// The purpose of the build goal is to take the source code and build a Docker image from it
// Not sure if we should be creating the image as latest, or some other version?
// This Docker image will then be tagged with the hash from the ImageID,  or Do we need to do that?

// The return value of this goal should be the hash id of the image

const { buildImage, tagImage } = require('./dockerizer');
const { loadFiles } = require('./file-loader');

// Take a config,  this config will have the docker client
async function buildGoal (config) {
  // Need to load the files we want to package
  const files = await loadFiles(config);
  // Dockerize the files
  const imageId = await buildImage(config, files);

  // We don't care about the return value,  just that it succeeds
  await tagImage(config, imageId);

  return imageId;
}

module.exports = buildGoal;
