const fs = require('fs');
const path = require('path');

module.exports = {
  pathExist: (pathGet) => fs.existsSync(pathGet),
  isAbsolute: (pathGet) => path.isAbsolute(pathGet),
  turnAbsolute: (pathGet) => path.resolve(pathGet),
  pathIsFile: (pathGet) => fs.statSync(pathGet).isFile(),

  readDirectory: function readDirectory(pathGet) {
    const files = fs.readdirSync(pathGet);
    const paths = [];

    files.forEach((file) => {
      if (path.extname(file) === '.md') {
        paths.push(file);
      } else {
        readDirectory(`${pathGet}/${file}`);
      }
    });

    return paths;
  },
};
