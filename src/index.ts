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
  if (!(cleanPageHref(location.href) in cachedAssets)) {
    cachedAssets[cleanPageHref(location.href)] = inlineAllDependencies(
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
  const samePageNavigation = cleanPageHref(this.href) === cleanPageHref(location.href);

  if (!event.ctrlKey && validLinkToFetch(this) && !samePageNavigation) {
    event.preventDefault();
    navigateTo(this.href);
  }
}

function loadAndCachePages(links: Array<HTMLAnchorElement>): void {
  links.forEach(async link => {
    if (!(cleanPageHref(link.href) in cachedAssets) && validLinkToFetch(link)) {
      const data = await fetchText(link.href);

      if (data !== null) {
        cachedAssets[cleanPageHref(link.href)] = inlineAllDependencies(
          createDocument(data),
          cachedAssets
        );
      }
    }
  });
}

function validLinkToFetch(link: HTMLAnchorElement): boolean {
  return 'href' in link && link.host === location.host;
}

// Remove fragment identifier
function cleanPageHref(href: string) {
  return href.split('#')[0];
}

async function navigateTo(href: string): Promise<void> {
  if (cleanPageHref(href) in cachedAssets) {
    // Navigate to a cached page
    const page = await Promise.resolve(cachedAssets[cleanPageHref(href)]);
    replacePage(href, page);
  } else {
    // Fetch page and navigate to it
    const page = await fetchText(href);

    if (page === null) {
      window.location.href = href;
    } else {
      replacePage(href, page);
      cachedAssets[cleanPageHref(href)] = inlineAllDependencies(createDocument(page), cachedAssets);
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
