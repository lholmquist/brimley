'use strict';

// Remove the deployment

// Remove the Service

// TODO: Remove the docker images that were built

module.exports = async function undeployGoal (config) {
  const service = await config.kubeClient.api.v1.ns('default').service(config.projectName).delete();

  const deployment = await config.kubeClient.apis.apps.v1.namespaces('default').deployments(config.projectName).delete();

  return {
    deployment,
    service
  };
};
