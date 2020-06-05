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
                  'image': 'node-app-brimley',
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
}

async function applyDeployment (config) {
  // Check to see if there is a Deployment first
  // If not then create
  // If So then replace
  try {
    const create = await config.kubeClient.apis.apps.v1.namespaces('default').deployments.post({ body: deploymentResource })
    console.log('Create:', create)
    return create;
  } catch (err) {
    if (err.code !== 409) throw err
    const replace = await config.kubeClient.apis.apps.v1.namespaces('default').deployments('node-app-brimley').put({ body: deploymentResource })
    console.log('Replace:', replace)
    return replace;
  }
}

module.exports = {
  applyDeployment
}



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
