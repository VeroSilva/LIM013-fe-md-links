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
  mdLinks(path, { validate: argv.validate })
    .then((res) => res.forEach((file) => {
      file.forEach((propeties) => {
        const responseStatus = (propeties.status >= 200 && propeties.status < 300)
          ? chalk.italic.green(`ok ${propeties.status}`)
          : chalk.italic.red(`fail ${propeties.status}`);
        console.log(chalk.hex('#FFFCA2')(propeties.file), chalk.cyan(propeties.href), propeties.status ? responseStatus : '', propeties.text);
      });
    }));
}
