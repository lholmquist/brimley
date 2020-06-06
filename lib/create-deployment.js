'use strict';

const { v4: uuidv4 } = require('uuid');

const baseDeployment = {
  apiVersion: 'apps/v1',
  kind: 'Deployment',
  metadata: {},
  spec: {}
};

function createDeploymentResource (config, imageId) {
  const appId = uuidv4();

  const spec = {
    selector: {
      matchLabels: {
        app: config.projectName
      }
    },
    template: {
      metadata: {
        labels: {
          app: config.projectName,
          appId: appId // Changing something in these labels will make the deployment re-deploy
        }
      },
      spec: {
        containers: [
          {
            name: config.projectName,
            image: `${config.projectName}:${imageId}`,
            imagePullPolicy: 'IfNotPresent',
            ports: [
              {
                containerPort: 8080
              }
            ]
          }
        ]
      }
    }
  };

  return { ...baseDeployment, spec: spec, metadata: { name: config.projectName } };
}

module.exports = createDeploymentResource;
