const fetch = require('node-fetch');
const functions = require('./functions.js');

module.exports = {
  findLinks: (pathGet) => {
    const findLinkRegExp = /\[[\`?a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s?\.?\-\`?]*\]\(((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)\)/gi;
    const contentFile = functions.readFile(pathGet);
    const links = [contentFile.match(findLinkRegExp), pathGet];
    return links;
  },
  dataLinks: (arrayLinks) => {
    const pathProperties = [];
    arrayLinks[0].forEach((linkMd) => {
      const positionLink = linkMd.indexOf('(');
      const firstPositionTxt = linkMd.indexOf('[');
      const lastPositionTxt = linkMd.indexOf(']');
      const href = linkMd.slice(positionLink + 1, -1);
      const text = linkMd.slice(firstPositionTxt + 1, lastPositionTxt);
      const obj = {
        text,
        href,
        file: arrayLinks[1],
      };
      pathProperties.push(obj);
    });
    return pathProperties;
  },
  validateLinks: (pathProperties) => Promise.all(
    pathProperties.map((obj, index) => fetch(obj.href)
      .then((resp) => [index, resp.status])
      .catch(() => [index, 500])),
  )
    .then((responses) => {
      responses.forEach((element) => pathProperties[element[0]].status = element[1]);
      return pathProperties;
    })
    .catch(() => []),
};
