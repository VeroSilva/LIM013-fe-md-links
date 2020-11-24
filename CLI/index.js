#!/usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk');
const { mdLinks } = require('../API/api.js');

const { argv } = yargs
  .option('validate', {
    alias: 'v',
    description: 'Validate links',
    type: 'boolean',
  })
  .option('stats', {
    alias: 's',
    description: 'Make links stadistic',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h');

if (argv._) {
  const path = argv._[0];
  const mdLinksResponse = mdLinks(path, { validate: argv.validate });
  if (!mdLinksResponse) {
    console.log('Not found');
  }
  if (argv.validate) {
    mdLinksResponse.then((res) => res.forEach((file) => {
      file.forEach((propeties) => {
        const responseStatus = (propeties.status >= 200 && propeties.status < 300)
          ? chalk.italic.green(`ok ${propeties.status}`)
          : chalk.italic.red(`fail ${propeties.status}`);
        console.log(chalk.hex('#FFFCA2')(propeties.file), chalk.cyan(propeties.href), propeties.status ? responseStatus : '', propeties.text);
      });
    }))
      .catch((err) => { throw err; });
  }
  if (argv.stats) {
    mdLinksResponse.then((arrayLinksProperties) => {
      const uniqueLinks = {};
      arrayLinksProperties.forEach((linksProperties) => {
        console.log('Total: ', linksProperties.length);
        linksProperties.forEach((eachLink) => {
          uniqueLinks[eachLink.href] = uniqueLinks[eachLink.href]
            ? uniqueLinks[eachLink.href] + 1 : 1;
        });
      });
      console.log('Unique: ', Object.keys(uniqueLinks).length);
    });
  }
}
