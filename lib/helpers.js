'use strict';

const jsyaml = require('js-yaml');

// Take yaml as a string that has already been loaded from a file or something.
function yamlToJson (yamlToParse) {
  return jsyaml.safeLoad(yamlToParse);
}

module.exports = {
  yamlToJson
}
