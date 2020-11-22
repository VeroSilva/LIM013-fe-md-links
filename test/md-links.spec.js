const fetchMock = require('fetch-mock-jest');
const functions = require('../API/functions.js');
const options = require('../API/options.js');

// Did path exist?
describe('functions.pathExist', () => {
  it('should be false', () => {
    expect(functions.pathExist('hola.md')).toBe(false);
  });
});

// Get absolute path
describe('functions.isAbsolute', () => {
  it('should return an absolute path', () => {
    expect(functions.getAbsolutepath('package.json')).toBe('/home/baudin-silva/proyectos/LIM013-fe-md-links/package.json');
  });
});

// Path is a file
describe('functions.pathIsFile', () => {
  it('should be true', () => {
    expect(functions.pathIsFile('/home/baudin-silva/proyectos/LIM013-fe-md-links/CLI/index.js')).toBe(true);
  });
});

// Read Directory
describe('functions.readDirectory', () => {
  it('should have lenght 3', () => {
    expect(functions.readDirectory('example')).toHaveLength(3);
  });
  it('should return 3 files', () => {
    expect(functions.readDirectory('example')).toStrictEqual(['example.md', 'example2.md', 'example3.md']);
  });
});

// Read File
const contentExpected = `Hola que tal
[Im an inline style link](https://www.google.com)
[Im an](https://www.google.com)
[Im an 123](https://www.google.com)
`;

describe('read File', () => {
  it('should read a file', (done) => functions.readFile('/home/baudin-silva/proyectos/LIM013-fe-md-links/example/example2/example3/example3.md')
    .then((response) => {
      expect(response).toBe(contentExpected);
      done();
    }));
});

// Data Link
const pathProperties = [
  {
    text: 'Im an inline style link',
    href: 'https://www.google.com',
    file: '/home/baudin-silva/proyectos/LIM013-fe-md-links/example/example2/example3/example3.md',
  },
  {
    text: 'Im an',
    href: 'https://www.google.com',
    file: '/home/baudin-silva/proyectos/LIM013-fe-md-links/example/example2/example3/example3.md',
  },
  {
    text: 'Im an 123',
    href: 'https://www.google.com',
    file: '/home/baudin-silva/proyectos/LIM013-fe-md-links/example/example2/example3/example3.md',
  },
];
describe('options.dataLink', () => {
  it('should return an objets array', () => {
    expect(options.dataLink('/home/baudin-silva/proyectos/LIM013-fe-md-links/example/example2/example3/example3.md')
      .then((response) => {
        expect(response).toStrictEqual(pathProperties);
      }));
  });
});

// Validate links
describe.skip('options.validateLinks', () => {
  const pathPropertiesB = [{
    text: 'Comprendiendo Promesas en Js',
    href: 'https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1',
    file: '/home/baudin-silva/proyectos/LIM013-fe-md-links/README.md',
  },
  {
    text: 'Pill de recursión - video',
    href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
    file: '/home/baudin-silva/proyectos/LIM013-fe-md-links/README.md',
  },
  {
    text: 'Pill de recursión - repositorio',
    href: 'https://github.com/merunga/pildora-recursion',
    file: '/home/baudin-silva/proyectos/LIM013-fe-md-links/README.md',
  }];
  // Mock the fetch() global to return a response
  fetchMock.get(pathProperties[1].href, { hello: 'world' }, {
    delay: 1000, // fake a slow network
    headers: {
      user: 'me', // only match requests with certain headers
    },
  });
  it(('should return status of a link'), (done) => {
    options.validateLinks(pathPropertiesB)
      .then((data) => {
        console.log('got data', data);
        done();
      });
  });
});
