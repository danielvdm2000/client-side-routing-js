import ICachedAssets from './interfaces/ICachedAssets';

const cachedPages: ICachedAssets = {};
const cachedStylesheets: ICachedAssets = {};
const cachedScripts: ICachedAssets = {};

main();
function main(): void {
  const preLoadLinks = true;
  const links: Array<HTMLAnchorElement> = Array.from(
    document.querySelectorAll("a:not([target='_blank'])")
  );

  // Add current page to cache
  if (!(location.href in cachedPages)) {
    cachedPages[location.href] = inlineAllStyles(document.documentElement);
  }

  // Override the anchor click events
  links.forEach(link => {
    link.addEventListener('click', customAnchorClickEvent);
  });

  // Preload pages
  if (preLoadLinks) {
    window.addEventListener('load', () => {
      loadAndCachePages(links);
    });
  }
}

// Navigate to past page on back button
window.addEventListener('popstate', () => {
  navigateTo(location.href);
});

// * the "this" parameter is just a way of defining the type of this.
function customAnchorClickEvent(this: HTMLAnchorElement, event: MouseEvent): void {
  if (event.ctrlKey) return;
  if (!('href' in this)) return;
  if (this.host !== location.host) return;

  event.preventDefault();

  if (location.href !== this.href) {
    navigateTo(this.href);
  }
}

async function inlineAllStyles(dom: HTMLElement): Promise<string> {
  const stylesheets: Array<HTMLLinkElement> = Array.from(
    dom.querySelectorAll('link[rel="stylesheet"]')
  );

  // Load the stylesheets data
  const allCSS: Array<string> = await Promise.all(
    stylesheets.map(({ href }) => {
      if (!(href in cachedStylesheets)) {
        cachedStylesheets[href] = fetchUrl(href);
      }

      return cachedStylesheets[href];
    })
  );

  // Inject the elements as innerHTML in the newElementType element
  stylesheets.forEach((stylesheet: HTMLLinkElement, idx: number) => {
    const styleElement: HTMLStyleElement = document.createElement('style');
    styleElement.innerHTML = allCSS[idx];
    stylesheet.replaceWith(styleElement);
  });

  return dom.innerHTML;
}

function createNewDocElement(documentInnerHTML: string): HTMLElement {
  const newDoc: HTMLDocument = document.implementation.createHTMLDocument();
  newDoc.documentElement.innerHTML = documentInnerHTML;
  return newDoc.documentElement;
}

function loadAndCachePages(links: Array<HTMLAnchorElement>): void {
  links.forEach(async ({ href }) => {
    if (!(href in cachedPages)) {
      const data = await fetchUrl(href);

      if (data !== null) {
        cachedPages[href] = inlineAllStyles(createNewDocElement(data));
      }
    }
  });
}

async function navigateTo(href: string): Promise<void> {
  if (href in cachedPages) {
    const page = await Promise.resolve(cachedPages[href]);
    replacePage(href, page);
  } else {
    const page = await fetchUrl(href);

    if (page === null) {
      window.location.href = href;
    } else {
      replacePage(href, page);
      cachedPages[href] = inlineAllStyles(createNewDocElement(page));
    }
  }
}

function replacePage(href: string, page: string): void {
  document.documentElement.innerHTML = page;
  executeDocumentScripts(document);
  history.pushState('', '', href);
  main();
}

function executeDocumentScripts(doc: Document): void {
  const scripts: Array<HTMLScriptElement> = Array.from(
    doc.querySelectorAll('script:not(.run-once-globally)')
  );

  scripts.map(async script => {
    const newScript = doc.createElement('script');
    let code = script.innerHTML;

    if (script.src) {
      code = await fetchUrl(script.src);
    }

    newScript.appendChild(doc.createTextNode(`(function(){${code}})()`));
    script.replaceWith(newScript);
  });
}

async function fetchUrl(url: string): Promise<string | null> {
  return fetch(url)
    .then(response => {
      return response.text();
    })
    .catch(error => {
      console.log(error);
      return null;
    });
}

console.log('Client side routing script ran');
