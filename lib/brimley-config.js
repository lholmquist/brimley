'use strict';

const kubeClientSetup = require('./kube-client-setup');
const dockerClientSetup = require('./docker-client-setup');

async function config () {
  const config = {};

  // Get the kubernetes client
  config.kubeClient = await kubeClientSetup();

  // Get the docker client
  // For now,  we can check if we are using minikube and pass in the relevant info to connect to that docker client
  config.dockerClient = dockerClientSetup();

  return config;

}

module.exports = config;
