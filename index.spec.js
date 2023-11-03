const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const { inlineStylesSelectors, inlineJSSelectors, inlineStylesTagRequiresNonceSelectors, inlineScriptTagRequiresNonceSelectors } = require('./selectors');
const cspHtmlLinter = require('./index');

describe('cspHtmlLinter', () => {

  it('should throw an error for all selectors', async () => {
    const inputHTML = `
      <html>
        <head>
          <style>.someClass{
            color:blue;
          }</style>
          <script src="invalid.js"></script>
        </head>
        <body>
        <div style="color:black;">inlinestyle</div>
          <a href="javascript:alert('Hello, World!')">Link</a>
          <iframe src="javascript:alert('Hello, World!')"></iframe>

          <div onclick="doSomething()"></div>
          <div onchange="doSomething()">onchange</div>
          <div onkeydown="doSomething()">onkeydown</div>
          <div onkeyup="doSomething()">onkeyup</div>
          <div onkeypress="doSomething()">onkeypress</div>
          <div onpaste="doSomething()">onpaste</div>
          <div onblur="doSomething()">onblur</div>
          <div onfocus="doSomething()">onfocus</div>
          <div onmousedown="doSomething()">onmousedown</div>
          <div onmouseup="doSomething()">onmouseup</div>
          <div onmouseenter="doSomething()">onmouseenter</div>
          <div onmouseout="doSomething()">onmouseout</div>
          <div onmouseover="doSomething()">onmouseover</div>
          <div onmousewheel="doSomething()">onmousewheel</div>
          <div onmousemove="doSomething()">onmousemove</div>
          <div onmouseleave="doSomething()">onmouseleave</div>
          <div onload="doSomething()">onload</div>
          <div onunload="doSomething()">onunload</div>
          <div onbeforeunload="doSomething()">onbeforeunload</div>
          <div onsubmit="doSomething()">onsubmit</div>
          <div onselect="doSomething()">onselect</div>
          <div onscroll="doSomething()">onscroll</div>
          <div onresize="doSomething()">onresize</div>
          <div oninput="doSomething()">oninput</div>
          <div oninvalid="doSomething()">oninvalid</div>
          <div onerror="doSomething()">onerror</div>
          <div onbeforeprint="doSomething()">onbeforeprint</div>
          <div onafterprint="doSomething()">onafterprint</div>

        </body>
      </html>
    `;
    let selectors = { ...inlineJSSelectors, ...inlineScriptTagRequiresNonceSelectors, ...inlineStylesTagRequiresNonceSelectors, ...inlineStylesSelectors };

    const code = inputHTML;

    const violations = cspHtmlLinter.parse(code);

    const expectedErrorMessage = `${selectors['[style]']}
${selectors['style:not([nonce])']}
${selectors['script:not([nonce])']}
${selectors['a[href*="javascript:"]']}
${selectors['[src*="javascript:"]']}
${selectors['[onclick]']}
${selectors['[onchange]']}
${selectors['[onkeydown]']}
${selectors['[onkeyup]']}
${selectors['[onkeypress]']}
${selectors['[onpaste]']}
${selectors['[onblur]']}
${selectors['[onfocus]']}
${selectors['[onmousedown]']}
${selectors['[onmouseup]']}
${selectors['[onmouseenter]']}
${selectors['[onmouseout]']}
${selectors['[onmouseover]']}
${selectors['[onmousewheel]']}
${selectors['[onmousemove]']}
${selectors['[onmouseleave]']}
${selectors['[onload]']}
${selectors['[onunload]']}
${selectors['[onbeforeunload]']}
${selectors['[onsubmit]']}
${selectors['[onselect]']}
${selectors['[onscroll]']}
${selectors['[onresize]']}
${selectors['[oninput]']}
${selectors['[oninvalid]']}
${selectors['[onerror]']}
${selectors['[onbeforeprint]']}
${selectors['[onafterprint]']}`;

    expect(violations.join('\n')).to.equal(expectedErrorMessage);

  });

  it('should not throw an error for inline styles as allowInlineStyles is set', async () => {
    const inputHTML = `
        <html>
          <head>
          </head>
          <body>
          <div style="color:black;">inlinestyle</div>
          </body>
        </html>
      `;

    const options = {
      allowInlineStyles: true
    };
    const code = inputHTML;

    const violations = cspHtmlLinter.parse(code, options);

    expect(violations.length).to.equal(0);

  });

  it('should not throw an error for inline js as allowInlineJs is set', async () => {
    const inputHTML = `
      <html>
        <head>

        </head>
        <body>
          <a href="javascript:alert('Hello, World!')">Link</a>
          <iframe src="javascript:alert('Hello, World!')"></iframe>

          <div onclick="doSomething()"></div>
          <div onchange="doSomething()">onchange</div>
          <div onkeydown="doSomething()">onkeydown</div>
          <div onkeyup="doSomething()">onkeyup</div>
          <div onkeypress="doSomething()">onkeypress</div>
          <div onpaste="doSomething()">onpaste</div>
          <div onblur="doSomething()">onblur</div>
          <div onfocus="doSomething()">onfocus</div>
          <div onmousedown="doSomething()">onmousedown</div>
          <div onmouseup="doSomething()">onmouseup</div>
          <div onmouseenter="doSomething()">onmouseenter</div>
          <div onmouseout="doSomething()">onmouseout</div>
          <div onmouseover="doSomething()">onmouseover</div>
          <div onmousewheel="doSomething()">onmousewheel</div>
          <div onmousemove="doSomething()">onmousemove</div>
          <div onmouseleave="doSomething()">onmouseleave</div>
          <div onload="doSomething()">onload</div>
          <div onunload="doSomething()">onunload</div>
          <div onbeforeunload="doSomething()">onbeforeunload</div>
          <div onsubmit="doSomething()">onsubmit</div>
          <div onselect="doSomething()">onselect</div>
          <div onscroll="doSomething()">onscroll</div>
          <div onresize="doSomething()">onresize</div>
          <div oninput="doSomething()">oninput</div>
          <div oninvalid="doSomething()">oninvalid</div>
          <div onerror="doSomething()">onerror</div>
          <div onbeforeprint="doSomething()">onbeforeprint</div>
          <div onafterprint="doSomething()">onafterprint</div>

        </body>
      </html>
    `;

    const options = {
      allowInlineJs: true
    };
    const code = inputHTML;
    const violations = cspHtmlLinter.parse(code, options);

    expect(violations.length).to.equal(0);
  });

  it('should not throw an error for style tag without nonce as allowStyleTagWithoutNonce is set', async () => {
    const inputHTML = `
      <html>
        <head>

        </head>
        <body>
          <style>
          .someClass{
            color:blue;
          }</style>

        </body>
      </html>
    `;

    const options = {
      allowStyleTagWithoutNonce: true
    };
    const code = inputHTML;
    const violations = cspHtmlLinter.parse(code, options);

    expect(violations.length).to.equal(0);
  });
  it('should not throw an error for script tag without nonce as allowScriptTagWithoutNonce is set', async () => {
    const inputHTML = `
      <html>
        <head>

        </head>
        <body>
          <script src="https://www.someurl.com"></script>

        </body>
      </html>
    `;

    const options = {
      allowScriptTagWithoutNonce: true
    };
    const code = inputHTML;
    const violations = cspHtmlLinter.parse(code, options);

    expect(violations.length).to.equal(0);
  });

  it('should not throw an error for valid HTML', async () => {
    const validHTML = `
      <html>
        <head>
          <style nonce="abcd1234">Valid Style</style>
          <script nonce="abcd1234" src="valid.js"></script>
        </head>
        <body>
          <a href="https://example.com">Link</a>
          <div></div>
        </body>
      </html>
    `;

    const code = validHTML;

    const violations = cspHtmlLinter.parse(code);

    expect(violations.length).to.equal(0);
  });
});