'use strict';

const serviceResource = {
   'apiVersion': 'v1',
   'kind': 'Service',
   'metadata': {
      'name': 'node-app-brimley'
   },
   'spec': {
      'ports': [
         {
            'port': 8080
         }
      ],
      'type': 'LoadBalancer',
      'selector': {
         'app': 'node-app-brimley'
      }
   }
};

async function applyService (config) {
  // Check to see if there is a Service first
  // If not then create
  // If So then replace
  try {
    const create = await config.kubeClient.api.v1.ns('default').service.post({ body: serviceResource });
    console.log('Create:', create)
    return create;
  } catch (err) {
    if (err.code !== 409) throw err
    const replace = await config.kubeClient.api.v1.ns('default').service('node-app-brimley').put({ body: serviceResource });
    console.log('Replace:', replace)
    return replace;
  }
}

module.exports = {
  applyService
}
