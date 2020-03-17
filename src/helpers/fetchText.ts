async function fetchText(url: string): Promise<string | null> {
  return fetch(url)
    .then(response => {
      return response.text();
    })
    .catch(error => {
      console.log(error);
      return null;
    });
}

export default fetchText;
