function createDocument(documentInnerHTML: string): Document {
  const doc: HTMLDocument = document.implementation.createHTMLDocument();
  doc.documentElement.innerHTML = documentInnerHTML;
  return doc;
}

export default createDocument;
