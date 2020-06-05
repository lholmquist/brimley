'use strict';

const brimleyConfig = require('../lib/brimley-config');
const dockerize = require('../lib/dockerize');
const { applyDeployment } = require('../lib/deployments');
const { applyService } = require('../lib/services');

async function cli (options) {
  // initialize the config
  // config will include a kube rest client and a docker client
  const config = await brimleyConfig();

  // Create a docker image based on the soure code
  await dockerize(config);


  // Create a deployment based on that image
  const deploymentResponse = await applyDeployment(config);

  // Create a service based on that deployment.
  const serviceResponse = await applyService(config);
  console.log('end');
}

module.exports = cli;
