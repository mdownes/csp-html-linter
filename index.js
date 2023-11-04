
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

module.exports = { parse };