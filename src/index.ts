import ICachedAssets from './interfaces/ICachedAssets';

const cachedPages: ICachedAssets = {};
const cachedStylesheets: ICachedAssets = {};
// const cachedScripts: ICachedAssets = {};

main();
function main(): void {
  const preLoadLinks = true;
  const links: Array<HTMLAnchorElement> = Array.from(
    document.querySelectorAll("a:not([target='_blank'])")
  );

  // Add current page to cache
  if (!(location.href in cachedPages)) {
    cachedPages[location.href] = inlineAllDependencies(document.documentElement);
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

async function inlineAllDependencies(dom: HTMLElement) {
  dom = await fetchAndInject(dom, 'link[rel="stylesheet"]', 'style', 'href', cachedStylesheets);
  //dom = await fetchAndInject(dom, 'script[src]', 'script', 'src', cachedScripts);

  return dom.innerHTML;
}

async function fetchAndInject(
  dom: HTMLElement,
  selector: string,
  newElementType: string,
  src: string,
  cache: ICachedAssets = {}
): Promise<HTMLElement> {
  const elements: Array<HTMLElement> = Array.from(dom.querySelectorAll(selector));

  // Load the elements data
  const elementsData: Array<string> = await Promise.all(
    elements.map(element => {
      const href = element[src];

      if (!(href in cache)) {
        cache[href] = fetchUrl(href);
      }

      return cache[href];
    })
  );

  // Inject the elements as innerHTML in the newElementType element
  elements.forEach((element: HTMLElement, idx: number) => {
    const newElement: HTMLElement = document.createElement(newElementType);
    newElement.innerHTML = elementsData[idx];
    element.replaceWith(newElement);
  });

  return dom;
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
        cachedPages[href] = inlineAllDependencies(createNewDocElement(data));
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
      cachedPages[href] = inlineAllDependencies(createNewDocElement(page));
    }
  }
}

function replacePage(href: string, page: string): void {
  document.documentElement.innerHTML = page;
  history.pushState('', '', href);
  main();
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
