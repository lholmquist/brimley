'use strict';

const cli = require('./bin/cli');

async function deploy () {
  cli({ cmd: 'deploy' });
}

async function build () {
  cli({ cmd: 'build' });
}

async function applyResource () {
  cli({ cmd: 'apply-resource' });
}

async function undeploy () {
  cli({ cmd: 'undeploy' });
}

module.exports = {
  deploy,
  build,
  applyResource,
  undeploy
};
