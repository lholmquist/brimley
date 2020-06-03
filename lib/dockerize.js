// docker.pull('registry.access.redhat.com/ubi8/nodejs-10', (err, stream) => {
//   stream.pipe(process.stdout);
// });

const Docker = require('dockerode');
const docker = new Docker();

async function dockerize () {
  docker.buildImage({
    context: process.cwd(),
    src: ['Dockerfile', 'index.js', 'package.json', 'views/']
  }, {
    t: 'imgcwd'
  }, function(error, output) {
    if (error) {
      return console.error(error);
    }
    output.pipe(process.stdout);
  });
}

module.exports = dockerize;
