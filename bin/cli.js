'use strict';

const brimleyConfig = require('../lib/config/brimley-config');
const buildGoal = require('../lib/goals/build');
const applyResourceGoal = require('../lib/goals/apply-resource');
const undeployGoal = require('../lib/goals/undeploy');

async function cli (options) {
  // initialize the config
  // config will include a kube rest client and a docker client
  const config = await brimleyConfig(options);

  let imageId;

  switch (options.cmd) {
    case 'build':
      // Create a docker image based on the soure code
      await buildGoal(config);
      break;
    case 'deploy':
      // Create a docker image based on the soure code
      imageId = await buildGoal(config);

      // Apply Kubernetes resources like a deploment and service
      await applyResourceGoal(config, imageId);
      break;
    case 'undeploy':
      // Remove the Deployment and Service
      // Delete Images created
      await undeployGoal(config);
      break;
    default:
      throw new TypeError(`Unexpected command: ${options.cmd}`);
  }
}

module.exports = cli;
