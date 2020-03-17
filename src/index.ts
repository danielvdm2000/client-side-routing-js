import createDocument from './helpers/createDocument';
import executeDocumentScripts from './helpers/executeDocumentScripts';
import fetchText from './helpers/fetchText';
import inlineAllDependencies from './helpers/inlineAllDependencies';
import ICachedAssets from './interfaces/ICachedAssets';

const cachedAssets: ICachedAssets = {};

main();
function main(): void {
  const preLoadLinks = true;
  const links: Array<HTMLAnchorElement> = Array.from(
    document.querySelectorAll("a:not([target='_blank'])")
  );

  // Add current page to cache
  if (!(location.href in cachedAssets)) {
    cachedAssets[location.href] = inlineAllDependencies(
      createDocument(document.documentElement.innerHTML),
      cachedAssets
    );
  }

  // Override the anchor click events
  links.forEach(link => {
    link.addEventListener('click', customAnchorClickEvent);
  });

  // Preload pages
  if (preLoadLinks) {
    setTimeout(() => loadAndCachePages(links), 10);
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

function loadAndCachePages(links: Array<HTMLAnchorElement>): void {
  links.forEach(async ({ href }) => {
    if (!(href in cachedAssets)) {
      const data = await fetchText(href);

      if (data !== null) {
        cachedAssets[href] = inlineAllDependencies(createDocument(data), cachedAssets);
      }
    }
  });
}

async function navigateTo(href: string): Promise<void> {
  if (href in cachedAssets) {
    const page = await Promise.resolve(cachedAssets[href]);
    replacePage(href, page);
  } else {
    const page = await fetchText(href);

    if (page === null) {
      window.location.href = href;
    } else {
      replacePage(href, page);
      cachedAssets[href] = inlineAllDependencies(createDocument(page), cachedAssets);
    }
  }
}

function replacePage(href: string, page: string): void {
  document.documentElement.innerHTML = page;
  executeDocumentScripts(document);
  history.pushState('', '', href);
  main();
}

console.log('Client side routing script ran');
