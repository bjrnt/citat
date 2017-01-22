function createQuoteBody(quote) {
  const quoteBody = document.createElement('p');
  quoteBody.id = 'quoteBody';
  quoteBody.innerText = `"${quote.text}"`;
  return quoteBody;
}

function createAuthor(quote) {
  const author = document.createElement('p');
  const reference = quote.reference ? ', ' + quote.reference : '';
  author.id = 'author';
  author.innerText = `- ${quote.author}${reference}`;
  return author;
}

window.chrome.runtime.onMessage.addListener((quote, sender, sendResponse) => {
  console.log(quote)
  const wrapper = document.querySelector('#prm');
  wrapper.appendChild(createQuoteBody(quote));
  wrapper.appendChild(createAuthor(quote));
  // document.querySelector('#prm').innerText = `"${quote.text}" - ${quote.author}, ${quote.reference}`
});
