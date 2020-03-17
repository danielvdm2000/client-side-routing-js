import ICachedAssets from '../interfaces/ICachedAssets';
import fetchText from './fetchText';

async function inlineAllDependencies(doc: Document, cachedAssets: ICachedAssets): Promise<string> {
  const stylesheets: Array<HTMLLinkElement> = Array.from(
    doc.querySelectorAll('link[rel="stylesheet"]')
  );
  const scripts: Array<HTMLScriptElement> = Array.from(
    doc.querySelectorAll('script[src]:not(.run-once-globally)')
  );

  const resolvedAssets = await Promise.all([
    ...getAssets(stylesheets, 'href', cachedAssets),
    ...getAssets(scripts, 'src', cachedAssets),
  ]);

  const styleCount = stylesheets.length;
  const scriptCount = scripts.length;

  inlineAsset(stylesheets, 'style', resolvedAssets.slice(0, styleCount));
  inlineAsset(scripts, 'script', resolvedAssets.slice(styleCount, styleCount + scriptCount));

  return doc.documentElement.innerHTML;
}

function getAssets(
  elements: Array<HTMLElement>,
  srcAttribute: string,
  cachedAssets: ICachedAssets
): Array<Promise<string>> {
  return elements.map(element => {
    const src = element[srcAttribute];

    if (!(src in cachedAssets)) {
      cachedAssets[src] = fetchText(src);
    }

    return cachedAssets[src];
  });
}

function inlineAsset(elements: Array<HTMLElement>, newElementType: string, assets: Array<string>) {
  elements.forEach((element: HTMLElement, idx: number) => {
    const newElement: HTMLElement = document.createElement(newElementType);
    newElement.innerHTML = assets[idx];
    element.replaceWith(newElement);
  });
}

export default inlineAllDependencies;
