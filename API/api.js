const functions = require('./functions.js');
const options = require('./options.js');

module.exports = {
  mdLinks: (path, option = { validate: false }) => {
    if (functions.pathExist(path)) {
      const absolutePath = functions.getAbsolutepath(path);
      let objPath = [];
      if (!functions.pathIsFile(absolutePath)) {
        const files = functions.readDirectory(absolutePath);
        return Promise.all(
          files.map((obj) => options.dataLink(obj)
            .then((response) => (option.validate ? options.validateLinks(response)
              .then((linksStatus) => linksStatus) : response))),
        )
          .then((responses) => {
            objPath = responses;
            return objPath;
          })
          .catch((err) => { throw err; });
      }
      return options.dataLink(absolutePath)
        .then((response) => (option.validate ? options.validateLinks(response)
          .then((linksStatus) => linksStatus) : response))
        .then((responses) => {
          objPath = responses;
          return [objPath];
        })
        .catch((err) => { throw err; });
    }
    return false;
  },
};
