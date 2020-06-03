'use strict';

const brimley = require('.');

(async function run () {
  await brimley.deploy();
})();



// docker.listImages({all: true}, function(err, containers) {
//     console.log('ALL: ' + containers.length);
//   });

//   const namespaces = await client.api.v1.namespaces.get()
//   console.log(namespaces);

// Create a Node.js Deployment Kubernetes
// 1. Take the source code and turn it into a docker container
// 2. Deploy that image to kubernetes
// 3. Create a service to get access to it
// 4. Get Access to it
