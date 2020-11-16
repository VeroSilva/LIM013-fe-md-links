const api = require('./api.js');

const pathRoute = 'example';

if (api.pathExist(pathRoute)) {
  if (!api.isAbsolute(pathRoute)) {
    api.turnAbsolute(pathRoute);
  }
  if (!api.pathIsFile(pathRoute)) {
    api.readDirectory(pathRoute);
  }
}

console.log(api.getArrayPaths());
