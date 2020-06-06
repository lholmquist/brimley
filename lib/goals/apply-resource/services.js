'use strict';

const logger = require('../../common-log')();

async function applyService (config, serviceResource) {
  // Check to see if there is a Service first
  // If not then create
  // If So then replace
  let service;
  try {
    service = await config.kubeClient.api.v1.ns('default').service.post({ body: serviceResource });
    logger.trace('Service Created and Applied');
  } catch (err) {
    if (err.code !== 409) throw err;
    logger.trace('Using Already Create Service');
    // Get the service so we can get the Nodeport value
    service = await config.kubeClient.api.v1.ns('default').service(config.projectName).get();
    // const replace = await config.kubeClient.api.v1.ns('default').service('node-app-brimley').put({ body: serviceResource });
  }

  return service;
}

module.exports = {
  applyService
};
