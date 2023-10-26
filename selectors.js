const inlineJs = 'You must not use inline Javascript: ';
const inlineJsEvents = 'You must not use the inline Javascript event: ';

exports.inlineStylesSelectors = {
    '[style]': 'You must not use inline styles',
}

exports.inlineStylesTagRequiresNonceSelectors = {
    'style:not([nonce])': 'You must add a nonce to a style tag'
}

exports.inlineScriptTagRequiresNonceSelectors = {
    'script:not([nonce])': 'You must add a nonce to a script tag'
}
exports.inlineJSSelectors = {
    'a[href*="javascript:"]': `${inlineJs}a[href*="javascript:"]`,
    '[src*="javascript:"]': `${inlineJs}[src*="javascript:"]`,
    '[onclick]': `${inlineJsEvents}onclick`,
    '[onchange]': `${inlineJsEvents}onchange`,
    '[onkeydown]': `${inlineJsEvents}onkeydown`,
    '[onkeyup]': `${inlineJsEvents}onkeyup`,
    '[onkeypress]': `${inlineJsEvents}onkeypress`,
    '[onpaste]': `${inlineJsEvents}onpaste`,
    '[onblur]': `${inlineJsEvents}onblur`,
    '[onfocus]': `${inlineJsEvents}onfocus`,
    '[onmousedown]': `${inlineJsEvents}onmousedown`,
    '[onmouseup]': `${inlineJsEvents}onmouseup`,
    '[onmouseenter]': `${inlineJsEvents}onmouseenter`,
    '[onmouseout]': `${inlineJsEvents}onmouseout`,
    '[onmouseover]': `${inlineJsEvents}onmouseover`,
    '[onmousewheel]': `${inlineJsEvents}onmousewheel`,
    '[onmousemove]': `${inlineJsEvents}onmousemove`,
    '[onmouseleave]': `${inlineJsEvents}onmouseleave`,
    '[onload]': `${inlineJsEvents}onload`,
    '[onunload]': `${inlineJsEvents}onunload`,
    '[onbeforeunload]': `${inlineJsEvents}onbeforeunload`,
    '[onsubmit]': `${inlineJsEvents}onsubmit`,
    '[onselect]': `${inlineJsEvents}onselect`,
    '[onscroll]': `${inlineJsEvents}onscroll`,
    '[onresize]': `${inlineJsEvents}onresize`,
    '[oninput]': `${inlineJsEvents}oninput`,
    '[oninvalid]': `${inlineJsEvents}oninvalid`,
    '[onerror]': `${inlineJsEvents}onerror`,
    '[onbeforeprint]': `${inlineJsEvents}onbeforeprint`,
    '[onafterprint]': `${inlineJsEvents}onafterprint`,
}

