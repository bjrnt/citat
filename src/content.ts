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

const OPTIONS_PAGE_URL = chrome.extension.getURL('pages/options.html');
function createGuide() {
  const elem = document.createElement('p');
  elem.id = 'guide';
  elem.innerHTML = `
    Click <a href="${OPTIONS_PAGE_URL}" target="_blank">here</a> to add your first quote to Citat!
  `;
  return elem;
}

window.chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const wrapper = document.querySelector('#prm');
  const quote = msg.quote;
  if (quote != null) {
    wrapper.appendChild(createQuoteBody(quote));
    wrapper.appendChild(createAuthor(quote));
  } else {
    wrapper.appendChild(createGuide());
  }
});
