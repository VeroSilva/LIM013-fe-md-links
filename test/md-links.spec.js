const fetchMock = require('../__mocks__/node-fetch.js');
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
    expect(functions.readDirectory('example')).toStrictEqual(['example/example.md', 'example/example2/example2.md', 'example/example2/example3/example3.md']);
  });
});

// Read File
const contentExpected = `HOLA 2
[Im an inline style link](https://www.google.com)
[Im an](https://www.google.com)
[Im an 123](https://www.google.com)
`;

describe('read File', () => {
  it('should read a file', () => {
    expect(functions.readFile('/home/baudin-silva/proyectos/LIM013-fe-md-links/example/example2/example3/example3.md')).toBe(contentExpected);
  });
});

// Find Link
const arrayLinks = [
  [
    '[Im an inline style link](https://www.google.com)',
    '[Im an](https://www.google.com)',
    '[Im an 123](https://www.google.com)',
  ],
  '/home/baudin-silva/proyectos/LIM013-fe-md-links/example/example2/example3/example3.md',
];
describe('options.findLinks', () => {
  it('should return an array with links and its files', () => {
    expect(options.findLinks('/home/baudin-silva/proyectos/LIM013-fe-md-links/example/example2/example3/example3.md')).toEqual(arrayLinks);
  });
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
describe('options.dataLinks', () => {
  it('should return an objets array', () => {
    expect(options.dataLinks(arrayLinks)).toStrictEqual(pathProperties);
  });
});

// Validate links
describe('options.validateLinks', () => {
  const pathPropertiesA = [{
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
  const pathPropertiesB = [{
    text: 'Comprendiendo Promesas en Js',
    href: 'https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1',
    file: '/home/baudin-silva/proyectos/LIM013-fe-md-links/README.md',
    status: 200,
  },
  {
    text: 'Pill de recursión - video',
    href: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
    file: '/home/baudin-silva/proyectos/LIM013-fe-md-links/README.md',
    status: 200,
  },
  {
    text: 'Pill de recursión - repositorio',
    href: 'https://github.com/merunga/pildora-recursion',
    file: '/home/baudin-silva/proyectos/LIM013-fe-md-links/README.md',
    status: 404,
  }];

  // Mock the fetch() global to return a response
  fetchMock
    .mock('https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1', 200)
    .mock('https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s', 200)
    .mock('https://github.com/merunga/pildora-recursion', 404);

  it(('should return links status'), (done) => {
    options.validateLinks(pathPropertiesA)
      .then((data) => {
        expect(data).toEqual(pathPropertiesB);
        done();
      });
  });
});
