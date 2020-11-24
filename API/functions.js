const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

module.exports = {
  pathExist: (pathGet) => fs.existsSync(pathGet),
  getAbsolutepath: (pathGet) => {
    if (path.isAbsolute(pathGet) === false) {
      return path.resolve(pathGet);
    }
    return pathGet;
  },
  pathIsFile: (pathGet) => fs.statSync(pathGet).isFile(),
  readDirectory: function readDirectory(pathGet) {
    let paths = [];
    if (fs.statSync(pathGet).isDirectory()) {
      const files = fs.readdirSync(pathGet);
      files.forEach((file) => {
        const newPaths = readDirectory(`${pathGet}/${file}`);
        paths = paths.concat(newPaths);
      });
    }

    if (path.extname(pathGet) === '.md') {
      paths.push(`${pathGet}`);
    }

    return paths;
  },
  readFile: (pathGet) => readFile(pathGet, 'utf-8')
    .then((data) => data)
    .catch((err) => { throw err; }),

};
