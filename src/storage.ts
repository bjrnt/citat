import { Quote } from './Quote';

export function loadQuotes(): Promise<Array<Quote>> {
  return new Promise(resolve => {
    chrome.storage.sync.get(data => {
      resolve(data['quotes']);
    });
  });
}

export function saveQuotes(quotes: Array<Quote>) {
  return new Promise(resolve => {
    chrome.storage.sync.set({ quotes }, () => {
      resolve();
    });
  });
}
