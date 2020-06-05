'use strict';

const cli = require('./bin/cli');

async function deploy () {
  cli({ cmd: 'deploy' });
}

async function build () {
  cli({ cmd: 'build' });
}

module.exports = {
  deploy,
  build
};
