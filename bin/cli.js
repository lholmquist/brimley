'use strict';

const setup = require('../lib/setup');
const dockerize = require('../lib/dockerize');

async function cli (options) {
  // initialize the kubernetes client
  // Should we also setup the docker client stuff in this function
  const client = await setup();

  // Do something based on the command the user chose
  // Create a docker image based on the soure code
  // Create a deployment based on that image
  // Create a service based on that deployment.
  dockerize();
}

module.exports = cli;
