'use strict';

const createDeployment = require('../../create-deployment');
const { applyDeployment } = require('./deployments');
const createService = require('../../create-service');
const { applyService } = require('./services');
const logger = require('../../common-log')();

async function applyResourceGoal (config, imageId) {
  // Create the deployment resource
  const deploymentResource = createDeployment(config, imageId);
  // Deploy the docker image we just created in the build step
  // the container image should be the projectName:imageID
  await applyDeployment(config, deploymentResource);

  // Create a service for the deployment
  const serviceResource = createService(config);

  const deployedService = await applyService(config, serviceResource);

  const kubeUrl = new URL(config.kubeClient.backend.requestOptions.baseUrl);

  // Output the host:port where the running application is?
  logger.info(`Application running at: http://${kubeUrl.hostname}:${deployedService.body.spec.ports[0].nodePort}`);
}

module.exports = applyResourceGoal;
