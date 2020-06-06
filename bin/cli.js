'use strict';

const brimleyConfig = require('../lib/config/brimley-config');
const buildGoal = require('../lib/goals/build');
const { applyDeployment } = require('../lib/deployments');
const { applyService } = require('../lib/services');

async function cli (options) {
  // initialize the config
  // config will include a kube rest client and a docker client
  const config = await brimleyConfig(options);

  switch (options.cmd) {
    case 'build':
      // Create a docker image based on the soure code
      await buildGoal(config);
      break;
    case 'deploy':
      // Create a docker image based on the soure code
      await buildGoal(config);

      // Create a deployment based on that image
      const deploymentResponse = await applyDeployment(config);

      // Create a service based on that deployment.
      const serviceResponse = await applyService(config);
      break;
    default:
      throw new TypeError(`Unexpected command: ${options.cmd}`);
  }
  console.log('end');
}

module.exports = cli;
