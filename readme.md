### csp-html-linter
A package to lint html for Content Security Policy Violations.
By default it throws errors if it finds any usage of:
* inline Styles
    * ```<div style="color:blue;"></div>```
* inline javascript
    * ```JavaScript:void(0)```
    * ```onclick="doSomething"```
* Style tags without a nonce
    * ```<style></style>```
* Script tags without a nonce
    * ```<script></script>```


### Install

Using npm:

```npm install csp-html-lint --save-dev```

### Basic Usage

Import the plugin and call parse() passing the code

```
const cspHtmlLinter = require('csp-html-linter');

const violations = cspHtmlLinter.parse(code);

```
### Advanced Usage 

Import the plugin and call parse() passing the code and the options.  
By default all options are defaulted to false.  

```javascript
const cspHtmlLinter = require('csp-html-linter');

const options = {
    allowInlineStyles:true,
    allowInlineJs:true,
    allowStyleTagWithoutNonce:true,
    allowScriptTagWithoutNonce:true
};

const violations = cspHtmlLinter.parse(code, options);
```


The configuration above will allow the following:

```html
<style>
    .color{
        color:red;
    }
</style>
<script></script>
<div onclick="doSomething()"></div>
<div style="color:black;"></div>
<a href="javascript:void(0)">click here</a>
```

### Options


#### allowInlineStyles

Type: Boolean : Optional

Indicates if inline styles should be allowed. Defaults to false.    

#### allowInlineJs

Type: Boolean : Optional

Indicates if inline JavaScript should be allowed. Defaults to false.    

#### allowStyleTagWithoutNonce

Type: Boolean : Optional

Indicates if style tags should require a nonce. Defaults to false.    

#### allowScriptTagWithoutNonce

Type: Boolean : Optional

Indicates if script tags should require a nonce. Defaults to false.  