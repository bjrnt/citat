import { Quote } from './Quote';

function createQuoteBody(quote: Quote) {
  const quoteBody = document.createElement('p');
  quoteBody.id = 'quoteBody';
  quoteBody.innerText = `"${quote.text}"`;
  return quoteBody;
}

function createAuthor(quote: Quote) {
  const author = document.createElement('p');
  const reference = quote.reference ? ', ' + quote.reference : '';
  author.id = 'author';
  author.innerText = `- ${quote.author}${reference}`;
  return author;
}

window.chrome.runtime.onMessage.addListener((quote: Quote, sender, sendResponse) => {
  const wrapper = document.querySelector('#prm');
  wrapper.appendChild(createQuoteBody(quote));
  wrapper.appendChild(createAuthor(quote));
});
