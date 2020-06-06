'use strict';

// export DOCKER_TLS_VERIFY="1"
// export DOCKER_HOST="tcp://192.168.39.50:2376"
// export DOCKER_CERT_PATH="/home/lucasholmquist/.minikube/certs"
// export MINIKUBE_ACTIVE_DOCKERD="minikube"
const Docker = require('dockerode');

function dockerClientSetup () {
  const docker = new Docker();
  return docker;
}


module.exports = dockerClientSetup;
