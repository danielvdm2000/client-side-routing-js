function executeDocumentScripts(doc: Document): void {
  const scripts: Array<HTMLScriptElement> = Array.from(
    doc.querySelectorAll('script:not(.run-once-globally)')
  );

  scripts.forEach(script => {
    const newScript = doc.createElement('script');
    let code = script.innerHTML;

    newScript.appendChild(doc.createTextNode(`(function(){${code}})()`));
    script.replaceWith(newScript);
  });
}

export default executeDocumentScripts;
