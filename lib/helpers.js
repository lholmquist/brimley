'use strict';

const jsyaml = require('js-yaml');
const { promisify } = require('util');
const fs = require('fs');

const readdir = promisify(fs.readdir);

function normalizeFileList (fileList, projectLocation) {
  const result = {
    existing: [],
    nonexistent: []
  };
  fileList.forEach((file) => {
    if (fs.existsSync(`${projectLocation}/${file}`)) {
      result.existing.push(file);
    } else {
      result.nonexistent.push(file);
    }
  });
  return result;
}

// Take yaml as a string that has already been loaded from a file or something.
function yamlToJson (yamlToParse) {
  return jsyaml.safeLoad(yamlToParse);
}

function listFiles (dir) {
  return readdir(dir);
}

module.exports = {
  yamlToJson,
  listFiles,
  normalizeFileList
};
