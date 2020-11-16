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
// describe('mdLinks.readDirectory', () => {
//   it('should', () => {
//     expect(mdLinks.readDirectory('example')).toBe('[example.md]');
//   });
// });
