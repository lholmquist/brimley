'use strict';

const logger = require('../../common-log')();
const helpers = require('../../helpers');

async function loadFiles (config) {
  const includedFiles = [];
  // Look to see if any files are specified in the package.json
  if (config.projectPackage.files && config.projectPackage.files.length > 0) {
    // Removes all nonexistent files and use that list
    // make sure we send in the projectLocation in case the user isn't in the CWD
    const normalizedFileList = helpers.normalizeFileList(config.projectPackage.files, config.projectLocation);
    if (normalizedFileList.nonexistent.length > 0) {
      logger.warning(`The following files do not exist: ${normalizedFileList.nonexistent}`);
    }
    includedFiles.push.apply(includedFiles, normalizedFileList.existing);
  } else {
    // If Not, then just use the current directory "./"
    logger.warning('a file property was not found in your package.json, archiving the current directory.');
    // Get the list of files and directories
    const fileList = await helpers.listFiles(config.projectLocation);
    // Push those into the includedFiles
    const filteredOut = fileList.filter((file) => {
      // exclude the node_modules and .git directories and tmp
      if (file === 'node_modules' || file === '.git' || file === 'tmp') {
        return false;
      }

      return true;
    });

    includedFiles.push.apply(includedFiles, filteredOut);
  }

  return includedFiles;
}

module.exports = {
  loadFiles
};
