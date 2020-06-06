'use strict';

const deploymentResource = {
   'apiVersion': 'apps/v1',
   'kind': 'Deployment',
   'metadata': {
      'name': 'node-app-brimley'
   },
   'spec': {
      'selector': {
         'matchLabels': {
            'app': 'node-app-brimley'
         }
      },
      'template': {
         'metadata': {
            'labels': {
               'app': 'node-app-brimley'
            }
         },
         'spec': {
            'containers': [
               {
                  'name': 'node-app-brimley',
                  'image': 'node-app-brimley:8457b9fe8019678b7c752fc7426b96e1a2bf56d1c83e2d3ecf303958975436f7',
                  'imagePullPolicy': 'IfNotPresent',
                  'ports': [
                     {
                        'containerPort': 8080
                     }
                  ]
               }
            ]
         }
      }
   }
};

const { v4: uuidv4 } = require('uuid');

async function applyDeployment (config, resourceToDeploy) {
  // Check to see if there is a Deployment first
  // If not then create
  // If So then replace
  const appId = uuidv4();

  deploymentResource.metadata.labels = {
    appId
  };

  // Changing something in these labels will make the deployment re-deploy
  deploymentResource.spec.template.metadata.labels.appId = appId;

  try {
    const create = await config.kubeClient.apis.apps.v1.namespaces('default').deployments.post({ body: deploymentResource });
    console.log('Create:', create);
    return create;
  } catch (err) {
    if (err.code !== 409) throw err;
    const replace = await config.kubeClient.apis.apps.v1.namespaces('default').deployments('node-app-brimley').put({ body: deploymentResource })
    console.log('Replace:', replace);
    return replace;
  }
}

module.exports = {
  applyDeployment
};

// apiVersion: apps/v1
// kind: Deployment
// metadata:
//   name: node
// spec:
//   selector:
//     matchLabels:
//       app: node
//   template:
//     metadata:
//       labels:
//         app: node
//     spec:
//       containers:
//       - name: node
//         image: node-example
//         ports:
//         - containerPort: 3000
