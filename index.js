'use strict';

const cli = require('./bin/cli');

async function deploy () {
  cli({ cmd: 'deploy' });
}

module.exports = {
  deploy
};
