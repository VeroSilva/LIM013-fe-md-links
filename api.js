const fs = require('fs');
const path = require('path');

module.exports = {
  pathExist: (pathGet) => fs.existsSync(pathGet),
  isAbsolute: (pathGet) => path.isAbsolute(pathGet),
  turnAbsolute: (pathGet) => path.resolve(pathGet),
  pathIsFile: (pathGet) => fs.statSync(pathGet).isFile(),
  readDirectory: function readDirectory(pathGet) {
    const files = fs.readdirSync(pathGet);
    let paths = [];

    files.forEach((file) => {
      if (path.extname(file) === '.md') {
        paths.push(file);
      } else {
        const newPaths = readDirectory(`${pathGet}/${file}`);
        paths = [].concat(paths, newPaths);
      }
    });

    return paths;
  },
  readFile: (pathGet) => fs.readFile(pathGet, 'utf-8', (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log(data);
    }
  }),
};
