// docker.pull('registry.access.redhat.com/ubi8/nodejs-10', (err, stream) => {
//   stream.pipe(process.stdout);
// });

async function dockerize (config) {
  return config.dockerClient.buildImage({
    context: process.cwd(),
    src: ['Dockerfile', 'index.js', 'package.json', 'views/']
  }, {
    t: 'node-app-brimley' // probably make this the package name
  }, function(error, output) {
    if (error) {
      return console.error(error);
    }
    output.pipe(process.stdout);
  });
}

module.exports = dockerize;
