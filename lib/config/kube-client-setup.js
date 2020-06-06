'use strict';

const { Client, KubeConfig } = require('kubernetes-client');
const Request = require('kubernetes-client/backends/request');

async function setup () {
  const kubeconfig = new KubeConfig();
  const clientConfig = {};
  kubeconfig.loadFromDefault();
  clientConfig.backend = new Request({ kubeconfig });

  const client = new Client(clientConfig);
  try {
    await client.loadSpec();
  } catch (err) {
    console.log(err);
  }

  return client;
}

module.exports = setup;
