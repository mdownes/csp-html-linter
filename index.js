#!/usr/bin/env node

const yargs = require('yargs');
const { globSync } = require('glob');
const chalk = require('chalk')
const fs = require("fs")
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { inlineStylesSelectors, inlineJSSelectors, inlineStylesTagRequiresNonceSelectors, inlineScriptTagRequiresNonceSelectors } = require('./selectors');

const parse = function parse(code, options) {
  options = options || {};
  let violations = [];
  const selectors = getSelectors(options);

  let dom;
  if (options.includeLocationInfo) {
    dom = new JSDOM(code, { includeNodeLocations: true });
  } else {
    dom = new JSDOM(code);
  }

  for (let selector in selectors) {
    const elements = dom.window.document.querySelectorAll(selector);
    if (elements.length) {
      elements.forEach(el => {
        if (options.includeLocationInfo) {
          violations.push({ message: selectors[selector], location: dom.nodeLocation(el) });
        } else {
          violations.push(selectors[selector]);
        }
      });
    }
  }
  return violations;
};

function getSelectors(options) {
  const allowInlineStyles = typeof options.allowInlineStyles !== 'undefined' ? options.allowInlineStyles : false;
  const allowInlineJs = typeof options.allowInlineJs !== 'undefined' ? options.allowInlineJs : false;
  const allowStyleTagWithoutNonce = typeof options.allowStyleTagWithoutNonce !== 'undefined' ? options.allowStyleTagWithoutNonce : false;
  const allowScriptTagWithoutNonce = typeof options.allowScriptTagWithoutNonce !== 'undefined' ? options.allowScriptTagWithoutNonce : false;

  let selectors = {};

  if (!allowInlineStyles) {
    selectors = { ...selectors, ...inlineStylesSelectors }
  }
  if (!allowStyleTagWithoutNonce) {
    selectors = { ...selectors, ...inlineStylesTagRequiresNonceSelectors }
  }
  if (!allowScriptTagWithoutNonce) {
    selectors = { ...selectors, ...inlineScriptTagRequiresNonceSelectors }
  }
  if (!allowInlineJs) {
    selectors = { ...selectors, ...inlineJSSelectors }
  }
  return selectors;
}

let violations = [];
const argv = yargs.argv;
const includePattern = argv.include;
const excludePattern = argv.exclude ? argv.exclude : 'node_modules/**';

let options = {
  allowInlineStyles: false,
  allowInlineJs: false,
  allowStyleTagWithoutNonce: false,
  allowScriptTagWithoutNonce: false
};
if (argv.allowInlineStyles) {
  options.allowInlineStyles = true
}
if (argv.allowInlineJs) {
  options.allowInlineJs = true
}
if (argv.allowStyleTagWithoutNonce) {
  options.allowStyleTagWithoutNonce = true
}
if (argv.allowScriptTagWithoutNonce) {
  options.allowScriptTagWithoutNonce = true
}

const files = globSync(includePattern, { ignore: excludePattern })
files.forEach(file => {
  const code = fs.readFileSync(file, 'utf-8');
  const result = parse(code, options);
  if (result.length > 0) {
    violations = violations.concat(mapViolations(result, file));
  }
});

if (violations.length > 0) {
  let result = (violations.map(v => `${v.violation}\n${v.file}`)).join('\n');
  console.error(chalk.red(`CSP Violations were found. \n${result}`));
}

function mapViolations(messages, id) {
  let violations = [];
  messages.forEach((v) => {
    violations.push({ file: id, violation: v });
  });

  return violations;
}


module.exports = { parse };