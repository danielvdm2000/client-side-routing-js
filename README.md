Work in progress

# client-side-routing-js
Basic client side routing for static and server side rendered websites

demo: https://danielvdm2000.github.io/client-side-routing-js/demo/index.html

cdn: https://cdn.jsdelivr.net/gh/danielvdm2000/client-side-routing-js@master/dist/bundle.min.js

Try it out on a website by pasting this in the inspector:
```javascript
const body = document.querySelector("body")
const newScript = document.createElement("script")

newScript.setAttribute("src", "https://cdn.jsdelivr.net/gh/danielvdm2000/client-side-routing-js@master/dist/bundle.min.js")
body.appendChild(newScript);
```
