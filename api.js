const fs = require('fs');
const path = require('path');
// const { promisify } = require('util');

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
  promisifyReadFile: (pathGet) => new Promise((resolve, reject) => {
    fs.readFile(pathGet, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }),
  readFile: (pathGet) => this.promisifyReadFile(pathGet, 'utf-8')
    .then((data) => console.log(data))
    .catch((err) => { console.log(err); }),

  // readFile: (pathGet, callback) => fs.readFile(pathGet, 'utf-8', callback),
  // readFile: (pathGet) => fs.readFile(pathGet, 'utf-8', (err, data) => {
  //   if (err) throw err;
  //   console.log(data);
  // }),
  // findLink: function;
};
