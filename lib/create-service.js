'use strict';

const baseService = {
  apiVersion: 'v1',
  kind: 'Service',
  metadata: {},
  spec: {}
};

function createServiceResource (config) {
  const spec = {
    ports: [
      {
        port: 8080
      }
    ],
    type: 'LoadBalancer',
    selector: {
      app: config.projectName
    }
  };

  return { ...baseService, spec: spec, metadata: { name: config.projectName } };
}

module.exports = createServiceResource;
