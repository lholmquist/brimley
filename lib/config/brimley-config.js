'use strict';

const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const logger = require('../common-log')();
const kubeClientSetup = require('./kube-client-setup');
const dockerClientSetup = require('./docker-client-setup');

async function config (options) {
  logger.info('Loading Configurations');
  const config = {};

  // Get the project location.  // TODO: make an option
  config.projectLocation = process.cwd();

  config.projectPackage = JSON.parse(await readFile(`${config.projectLocation}/package.json`, { encoding: 'utf8' }));

  if (!config.projectPackage.name.match(/^[a-z][0-9a-z-]+[0-9a-z]$/)) {
    throw new Error('"name" in package.json can only consist lower-case letters, numbers, and dashes. It must start with a letter and can\'t end with a -.');
  }
  config.projectName = config.projectPackage.name;
  config.projectVersion = config.projectPackage.version || '0.0.0';

  // Get the kubernetes client
  config.kubeClient = await kubeClientSetup();

  // Get the docker client
  // For now,  we can check if we are using minikube and pass in the relevant info to connect to that docker client
  config.dockerClient = await dockerClientSetup();

  return config;
}

module.exports = config;
