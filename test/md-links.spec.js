/* eslint-disable arrow-body-style */
const api = require('../api.js');
const mdLinks = require('../api.js');

// Did path exist?
describe('mdLinks.pathExist', () => {
  it('should be false', () => {
    expect(mdLinks.pathExist('hola.md')).toBe(false);
  });
});

// Is absolute?
describe('mdLinks.isAbsolute', () => {
  it('should be true', () => {
    expect(mdLinks.isAbsolute('/home/baudin-silva/proyectos/LIM013-fe-md-links/package-lock.json')).toBe(true);
  });
});

// Turn Absolute
describe('mdLinks.turnAbsolute', () => {
  it('should become absolute ', () => {
    expect(mdLinks.turnAbsolute('index.js')).toBe('/home/baudin-silva/proyectos/LIM013-fe-md-links/index.js');
  });
});

// Path is a file
describe('mdLinks.pathIsFile', () => {
  it('should be true', () => {
    expect(mdLinks.pathIsFile('index.js')).toBe(true);
  });
});

// Read Directory
describe('mdLinks.readDirectory', () => {
  it('should have lenght 3', () => {
    expect(mdLinks.readDirectory('example')).toHaveLength(3);
  });
  it('should return 3 files', () => {
    expect(mdLinks.readDirectory('example')).toStrictEqual(['example.md', 'example2.md', 'example3.md']);
  });
});

// Read File
describe('Read file', () => {
  it('should read a file', () => {
    return expect(api.promisifyReadFile('/home/baudin-silva/proyectos/LIM013-fe-md-links/example/example2/example3/example3.md')).resolves.toBe('Hola que tal\n');
  });
});

// describe('mdLinks.', () => {
//   it('should read a file', (done) => {
//     const callback = (err, data) => {
//       expect(data).toBe('Hola que tal\n');
//       done();
//     };
//     mdLinks.readFile('/home/baudin-silva/proyectos/
// LIM013-fe-md-links/example/example2/example3/example3.md', callback);
//   });
// });
