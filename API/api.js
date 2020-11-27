const functions = require('./functions.js');
const options = require('./options.js');

module.exports = {
  mdLinks: (path, option = {}) => new Promise((resolve, reject) => {
    if (functions.pathExist(path)) {
      const absolutePath = functions.getAbsolutepath(path);
      let objPath = [];
      if (!functions.pathIsFile(absolutePath)) {
        const files = functions.readDirectory(absolutePath);
        files.forEach((file) => {
          const links = options.findLinks(file);
          const data = options.dataLinks(links);
          objPath = [].concat(objPath, data);
        });
        if (option.validate) {
          resolve(options.validateLinks(objPath));
        }
        resolve(objPath);
      }
      const links = options.findLinks(absolutePath);
      const data = options.dataLinks(links);
      objPath = [].concat(objPath, data);
      if (option.validate) {
        resolve(options.validateLinks(objPath));
      }
      resolve(objPath);
    } else {
      reject();
    }
  }),
};
