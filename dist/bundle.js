parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"EQrf":[function(require,module,exports) {
"use strict";function e(e){var t=document.implementation.createHTMLDocument();return t.documentElement.innerHTML=e,t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"LZXJ":[function(require,module,exports) {
"use strict";function e(e){Array.from(e.querySelectorAll("script:not(.run-once-globally)")).forEach(function(r){var t=e.createElement("script"),n=r.innerHTML;t.appendChild(e.createTextNode("(function(){"+n+"})()")),r.replaceWith(t)})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"GiNK":[function(require,module,exports) {
"use strict";var t=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(o,u){function i(t){try{c(r.next(t))}catch(e){u(e)}}function a(t){try{c(r.throw(t))}catch(e){u(e)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n(function(t){t(e)})).then(i,a)}c((r=r.apply(t,e||[])).next())})},e=this&&this.__generator||function(t,e){var n,r,o,u,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function a(u){return function(a){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&u[0]?r.return:u[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return i.label++,{value:u[1],done:!1};case 5:i.label++,r=u[1],u=[0];continue;case 7:u=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===u[0]||2===u[0])){i=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){i.label=u[1];break}if(6===u[0]&&i.label<o[1]){i.label=o[1],o=u;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(u);break}o[2]&&i.ops.pop(),i.trys.pop();continue}u=e.call(t,i)}catch(a){u=[6,a],r=0}finally{n=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,a])}}};function n(n){return t(this,void 0,Promise,function(){return e(this,function(t){return[2,fetch(n).then(function(t){return t.text()}).catch(function(t){return console.log(t),null})]})})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=n;
},{}],"SwJS":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(o,i){function l(e){try{u(n.next(e))}catch(t){i(t)}}function a(e){try{u(n.throw(e))}catch(t){i(t)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r(function(e){e(t)})).then(l,a)}u((n=n.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var r,n,o,i,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;l;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return l.label++,{value:i[1],done:!1};case 5:l.label++,n=i[1],i=[0];continue;case 7:i=l.ops.pop(),l.trys.pop();continue;default:if(!(o=(o=l.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){l=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){l.label=i[1];break}if(6===i[0]&&l.label<o[1]){l.label=o[1],o=i;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(i);break}o[2]&&l.ops.pop(),l.trys.pop();continue}i=t.call(e,l)}catch(a){i=[6,a],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},r=this&&this.__spreadArrays||function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),o=0;for(t=0;t<r;t++)for(var i=arguments[t],l=0,a=i.length;l<a;l++,o++)n[o]=i[l];return n},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var o=n(require("./fetchText"));function i(n,o){return e(this,void 0,Promise,function(){var e,i,u,c,s;return t(this,function(t){switch(t.label){case 0:return e=Array.from(n.querySelectorAll('link[rel="stylesheet"]')),i=Array.from(n.querySelectorAll("script[src]:not(.run-once-globally)")),[4,Promise.all(r(l(e,"href",o),l(i,"src",o)))];case 1:return u=t.sent(),c=e.length,s=i.length,a(e,"style",u.slice(0,c)),a(i,"script",u.slice(c,c+s)),[2,n.documentElement.innerHTML]}})})}function l(e,t,r){return e.map(function(e){var n=e[t];return n in r||(r[n]=o.default(n)),r[n]})}function a(e,t,r){e.forEach(function(e,n){var o=document.createElement(t);o.innerHTML=r[n],e.replaceWith(o)})}exports.default=i;
},{"./fetchText":"GiNK"}],"QCba":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function u(e){try{l(r.next(e))}catch(t){i(t)}}function a(e){try{l(r.throw(e))}catch(t){i(t)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(u,a)}l((r=r.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(a){i=[6,a],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=n(require("./helpers/createDocument")),o=n(require("./helpers/executeDocumentScripts")),i=n(require("./helpers/fetchText")),u=n(require("./helpers/inlineAllDependencies")),a={};function l(){var e=Array.from(document.querySelectorAll("a:not([target='_blank'])"));location.href in a||(a[location.href]=u.default(r.default(document.documentElement.innerHTML),a)),e.forEach(function(e){e.addEventListener("click",c)}),setTimeout(function(){return s(e)},10)}function c(e){e.ctrlKey||"href"in this&&this.host===location.host&&(e.preventDefault(),location.href!==this.href&&f(this.href))}function s(n){var o=this;n.forEach(function(n){var l=n.href;return e(o,void 0,void 0,function(){var e;return t(this,function(t){switch(t.label){case 0:return l in a?[3,2]:[4,i.default(l)];case 1:null!==(e=t.sent())&&(a[l]=u.default(r.default(e),a)),t.label=2;case 2:return[2]}})})})}function f(n){return e(this,void 0,Promise,function(){var e;return t(this,function(t){switch(t.label){case 0:return n in a?[4,Promise.resolve(a[n])]:[3,2];case 1:return e=t.sent(),h(n,e),[3,4];case 2:return[4,i.default(n)];case 3:null===(e=t.sent())?window.location.href=n:(h(n,e),a[n]=u.default(r.default(e),a)),t.label=4;case 4:return[2]}})})}function h(e,t){document.documentElement.innerHTML=t,o.default(document),history.pushState("","",e),l()}l(),window.addEventListener("popstate",function(){f(location.href)}),console.log("Client side routing script ran");
},{"./helpers/createDocument":"EQrf","./helpers/executeDocumentScripts":"LZXJ","./helpers/fetchText":"GiNK","./helpers/inlineAllDependencies":"SwJS"}]},{},["QCba"], null)
//# sourceMappingURL=/bundle.js.map