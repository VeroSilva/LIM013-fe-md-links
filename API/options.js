const fetch = require('node-fetch');
const functions = require('./functions.js');

module.exports = {
  dataLink: (pathGet) => {
    const fidnLinkRegExp = /\[[\`?a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s?\.?\-\`?]*\]\(((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)\)/gi;
    const links = functions.readFile(pathGet);
    const pathProperties = [];
    return links
      .then((response) => response.match(fidnLinkRegExp))
      .then((linksArray) => {
        linksArray.forEach((linkMd) => {
          const obj = {};
          const positionLink = linkMd.indexOf('(');
          const firstPositionTxt = linkMd.indexOf('[');
          const lastPositionTxt = linkMd.indexOf(']');
          const href = linkMd.slice(positionLink + 1, -1);
          const text = linkMd.slice(firstPositionTxt + 1, lastPositionTxt);
          obj.text = text;
          obj.href = href;
          obj.file = pathGet;
          pathProperties.push(obj);
        });
        return pathProperties;
      });
  },
  validateLinks: (pathProperties) => Promise.all(
    pathProperties.map((obj, index) => fetch(obj.href)
      .then((resp) => [index, resp.status])),
  )
    .then((responses) => {
      responses.forEach((element) => pathProperties[element[0]].status = element[1]);
      return pathProperties;
    }),
};
