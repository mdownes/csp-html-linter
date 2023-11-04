### csp-html-linter
A tool designed to analyze HTML and identify potential breaches of Content Security Policy (CSP) rules. The goal is to prevent CSP violations from infiltrating your codebase during the build process.  
By default it throws errors if it finds any usage of:
* inline Styles
    * ```<div style="color:blue;"></div>```
* inline javascript similar to:  
    * ```javascript:void(0)```
    * ```onclick="doSomething()"```
* Style tags without a nonce attribute
    * ```<style></style>```
* Script tags without a nonce attribute
    * ```<script></script>```


### Install

Using npm:

```npm install csp-html-lint --save-dev```

### Basic Usage

Import the plugin and call parse() passing the code

```javascript
const cspHtmlLinter = require('csp-html-linter');

const violations = cspHtmlLinter.parse(code);

```
Returns an array of violation messages in the form :   
```['violation message 1', 'violations message 2']```  

### Advanced Usage 

Import the plugin and call parse() passing the code and the options.  
By default all options are defaulted to false.  

```javascript
const cspHtmlLinter = require('csp-html-linter');

const options = {
    allowInlineStyles: true,
    allowInlineJs: true,
    allowStyleTagWithoutNonce: true,
    allowScriptTagWithoutNonce: true,
    includeLocationInfo: true
};

const violations = cspHtmlLinter.parse(code, options);

```
if includeLocationInfo is set, returns an object in the form :   
```json
{ 
    message:'',  
    location: {
      startLine,
      startCol,
      startOffset,
      endLine,
      endCol,
      endOffset
    } 
}
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

#### includeLocationInfo
Type Boolean : optional

Indicates if location info should be returned.
When set, the returned object is no longer an array of messages but a format similar to the following:  
```json
{
    message: 'You must not use the inline Javascript event: onclick',
    location: {
      startLine,
      startCol,
      startOffset,
      endLine,
      endCol,
      endOffset,
    }
  }
  ```