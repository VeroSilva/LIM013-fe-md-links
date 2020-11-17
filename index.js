const api = require('./api.js');

const pathRoute = 'example';

if (api.pathExist(pathRoute)) {
  if (!api.isAbsolute(pathRoute)) {
    api.turnAbsolute(pathRoute);
  }
  if (!api.pathIsFile(pathRoute)) {
    console.log(api.readDirectory(pathRoute));
  }
}
console.log(api.readFile('/home/baudin-silva/proyectos/LIM013-fe-md-links/example/example2/example3/example3.md'));
// console.log(api.readFile('/home/baudin-silva/proyectos/LIM013-fe-md-links/README.md'));
