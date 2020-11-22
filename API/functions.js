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
    const files = fs.readdirSync(pathGet);
    let paths = [];

    files.forEach((file) => {
      if (path.extname(file) === '.md') {
        paths.push(`${pathGet}/${file}`);
      } else {
        const newPaths = readDirectory(`${pathGet}/${file}`);
        paths = [].concat(paths, newPaths);
      }
    });

    return paths;
  },
  readFile: (pathGet) => readFile(pathGet, 'utf-8')
    .then((data) => data)
    .catch((err) => { throw err; }),

};
