// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"924c4e4a62d2bafff85e7539e6e8fac8":[function(require,module,exports) {
var global = arguments[3];
var __PARCEL_HMR_ENV_HASH = "d751713988987e9331980363e24189ce";var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function(fn) {
      this._acceptCallbacks.push(fn || function() {});
    },
    dispose: function(fn) {
      this._disposeCallbacks.push(fn);
    },
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets;

// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = location.hostname;
  var port = location.port ? ':' + location.port : '';
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + port + '/');
  ws.onmessage = function(event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};

    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();

      let assets = data.assets.filter(
        // eslint-disable-next-line no-undef
        asset => asset.envHash === __PARCEL_HMR_ENV_HASH,
      );

      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();

        assets.forEach(function(asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe
          ? ansiDiagnostic.codeframe
          : ansiDiagnostic.stack;

        console.error(
          '🚨 [parcel]: ' +
            ansiDiagnostic.message +
            '\n' +
            stack +
            '\n\n' +
            ansiDiagnostic.hints.join('\n'),
        );
      }

      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function(e) {
    console.error(e.message);
  };
  ws.onclose = function(e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  let errorHTML =
    '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;

    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';

  overlay.innerHTML = errorHTML;

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;

  var cached = bundle.cache[id];

  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function(v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function(cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function(cb) {
      var assetsToAlsoAccept = cb(function() {
        return getParents(global.parcelRequire, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"c549420f29a961adf7d8ecf499743399":[function(require,module,exports) {
"use strict";

var _createDocument = _interopRequireDefault(require("./helpers/createDocument"));

var _executeDocumentScripts = _interopRequireDefault(require("./helpers/executeDocumentScripts"));

var _fetchText = _interopRequireDefault(require("./helpers/fetchText"));

var _inlineAllDependencies = _interopRequireDefault(require("./helpers/inlineAllDependencies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cachedAssets = {};
main();

function main() {
  const preLoadLinks = true;
  const links = Array.from(document.querySelectorAll("a:not([target='_blank'])")); // Add current page to cache

  if (!(location.href in cachedAssets)) {
    cachedAssets[location.href] = (0, _inlineAllDependencies.default)((0, _createDocument.default)(document.documentElement.innerHTML), cachedAssets);
  } // Override the anchor click events


  links.forEach(link => {
    link.addEventListener('click', customAnchorClickEvent);
  }); // Preload pages

  if (preLoadLinks) {
    setTimeout(() => loadAndCachePages(links), 10);
  }
} // Navigate to past page on back button


window.addEventListener('popstate', () => {
  navigateTo(location.href);
}); // * the "this" parameter is just a way of defining the type of this.

function customAnchorClickEvent(event) {
  if (event.ctrlKey) return;
  if (!('href' in this)) return;
  if (this.host !== location.host) return;
  event.preventDefault();

  if (location.href !== this.href) {
    navigateTo(this.href);
  }
}

function loadAndCachePages(links) {
  links.forEach(async ({
    href
  }) => {
    if (!(href in cachedAssets)) {
      const data = await (0, _fetchText.default)(href);

      if (data !== null) {
        cachedAssets[href] = (0, _inlineAllDependencies.default)((0, _createDocument.default)(data), cachedAssets);
      }
    }
  });
}

async function navigateTo(href) {
  if (href in cachedAssets) {
    const page = await Promise.resolve(cachedAssets[href]);
    replacePage(href, page);
  } else {
    const page = await (0, _fetchText.default)(href);

    if (page === null) {
      window.location.href = href;
    } else {
      replacePage(href, page);
      cachedAssets[href] = (0, _inlineAllDependencies.default)((0, _createDocument.default)(page), cachedAssets);
    }
  }
}

function replacePage(href, page) {
  document.documentElement.innerHTML = page;
  (0, _executeDocumentScripts.default)(document);
  history.pushState('', '', href);
  main();
}

console.log('Client side routing script ran');
},{"./helpers/inlineAllDependencies":"63f8f1342b2f8225b6365d3a23f80889","./helpers/fetchText":"72009e7d79b639f66dc5da3b044d840b","./helpers/executeDocumentScripts":"f0b38aab471b7bf00d8f085e3138513a","./helpers/createDocument":"905126a305e1f676cbec5db4e5b6aad2"}],"63f8f1342b2f8225b6365d3a23f80889":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fetchText = _interopRequireDefault(require("./fetchText"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function inlineAllDependencies(doc, cachedAssets) {
  const stylesheets = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));
  const scripts = Array.from(doc.querySelectorAll('script[src]:not(.run-once-globally)'));
  const resolvedAssets = await Promise.all([...getAssets(stylesheets, 'href', cachedAssets), ...getAssets(scripts, 'src', cachedAssets)]);
  const styleCount = stylesheets.length;
  const scriptCount = scripts.length;
  inlineAsset(stylesheets, 'style', resolvedAssets.slice(0, styleCount));
  inlineAsset(scripts, 'script', resolvedAssets.slice(styleCount, styleCount + scriptCount));
  return doc.documentElement.innerHTML;
}

function getAssets(elements, srcAttribute, cachedAssets) {
  return elements.map(element => {
    const src = element[srcAttribute];

    if (!(src in cachedAssets)) {
      cachedAssets[src] = (0, _fetchText.default)(src);
    }

    return cachedAssets[src];
  });
}

function inlineAsset(elements, newElementType, assets) {
  elements.forEach((element, idx) => {
    const newElement = document.createElement(newElementType);
    newElement.innerHTML = assets[idx];
    element.replaceWith(newElement);
  });
}

var _default = inlineAllDependencies;
exports.default = _default;
},{"./fetchText":"72009e7d79b639f66dc5da3b044d840b"}],"72009e7d79b639f66dc5da3b044d840b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

async function fetchText(url) {
  return fetch(url).then(response => {
    return response.text();
  }).catch(error => {
    console.log(error);
    return null;
  });
}

var _default = fetchText;
exports.default = _default;
},{}],"f0b38aab471b7bf00d8f085e3138513a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function executeDocumentScripts(doc) {
  const scripts = Array.from(doc.querySelectorAll('script:not(.run-once-globally)'));
  scripts.forEach(script => {
    const newScript = doc.createElement('script');
    let code = script.innerHTML;
    newScript.appendChild(doc.createTextNode(`(function(){${code}})()`));
    script.replaceWith(newScript);
  });
}

var _default = executeDocumentScripts;
exports.default = _default;
},{}],"905126a305e1f676cbec5db4e5b6aad2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function createDocument(documentInnerHTML) {
  const doc = document.implementation.createHTMLDocument();
  doc.documentElement.innerHTML = documentInnerHTML;
  return doc;
}

var _default = createDocument;
exports.default = _default;
},{}]},{},["924c4e4a62d2bafff85e7539e6e8fac8","c549420f29a961adf7d8ecf499743399"], null)

//# sourceMappingURL=bundle.js.map
