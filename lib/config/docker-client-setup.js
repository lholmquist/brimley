'use strict';

// export DOCKER_TLS_VERIFY="1"
// export DOCKER_HOST="tcp://192.168.39.50:2376"
// export DOCKER_CERT_PATH="/home/lucasholmquist/.minikube/certs"
// export MINIKUBE_ACTIVE_DOCKERD="minikube"
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { readFileSync } = require('fs');

const Docker = require('dockerode');

async function getMinikubeEnvironmentVariables () {
  // Make a call to minikube docker-env
  try {
    const { stdout } = await exec('minikube docker-env');

    const envs = stdout
      .split('\n') // Split on newline
      .filter((v) => { // Then only return the lines that have the export
        return v.includes('export');
      })
      .map((v) => { // Now make those lines into an Array of objects
        const splitExport = v.split('export')[1].trim();
        const splitObject = splitExport.split('=');
        return { [splitObject[0]]: splitObject[1].replace(/"/g, '') };
      })
      .reduce((acc, x) => { // Flatten the array of objects into one object
        return { ...acc, ...x };
      }, {});

    return envs;
  } catch (err) {
    return Promise.reject(new Error(err));
  }
}

async function dockerClientSetup (options = {}) {
  // By default, try to get the minikube environment
  const minikubeEnv = await getMinikubeEnvironmentVariables();

  const url = new URL(minikubeEnv.DOCKER_HOST);

  const docker = new Docker({
    host: url.hostname,
    port: url.port || 2375,
    ca: readFileSync(`${minikubeEnv.DOCKER_CERT_PATH}/ca.pem`),
    cert: readFileSync(`${minikubeEnv.DOCKER_CERT_PATH}/cert.pem`),
    key: readFileSync(`${minikubeEnv.DOCKER_CERT_PATH}/key.pem`)
  });

  return docker;
}

module.exports = dockerClientSetup;
