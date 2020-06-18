'use strict';

const logger = require('../../common-log')();

async function applyDeployment (config, resourceToDeploy) {
  // Check to see if there is a Deployment first
  // If not then create
  // If So then replace

  try {
    const create = await config.kubeClient.apis.apps.v1.namespaces('default').deployments.post({ body: resourceToDeploy });
    logger.trace('Deployment Applied');
    return create;
  } catch (err) {
    if (err.code !== 409) throw err;
    const replace = await config.kubeClient.apis.apps.v1.namespaces('default').deployments(config.projectName).put({ body: resourceToDeploy });
    logger.trace('Deployment Updated');
    return replace;
  }
}

module.exports = {
  applyDeployment
};
