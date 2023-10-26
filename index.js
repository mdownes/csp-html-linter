
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { inlineStylesSelectors, inlineJSSelectors, inlineStylesTagRequiresNonceSelectors, inlineScriptTagRequiresNonceSelectors } = require('./selectors');

const parse = function parse(code, options) {
  let violations = [];
  const selectors = getSelectors(options);
  const dom = new JSDOM(code);
  for (let selector in selectors) {
    const elements = dom.window.document.querySelectorAll(selector);
    if (elements.length) {
      violations.push(selectors[selector]);
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

module.exports = { parse };