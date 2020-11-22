const functions = require('./functions.js');
const options = require('./options.js');

module.exports = {
  mdLinks: (path, option = { validate: false }) => {
    if (functions.pathExist(path)) {
      const absolutePath = functions.getAbsolutepath(path);
      if (!functions.pathIsFile(absolutePath)) {
        const files = functions.readDirectory(absolutePath);
        let objPath = [];
        return Promise.all(
          files.map((obj) => options.dataLink(obj)
            .then((response) => (option.validate ? options.validateLinks(response)
              .then((linksStatus) => linksStatus) : response))),
        )
          .then((responses) => {
            objPath = responses;
            return objPath;
          });
      }
    }
    return false;
  },
};
