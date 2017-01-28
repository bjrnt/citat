import { Quote } from './Quote';

window.chrome.tabs.onUpdated.addListener((tabId, changes, tab) => {
  if (tab.url === 'chrome://newtab/' && changes.status === 'complete') {
    const quotes = chrome.storage.sync.get(data => {
      const quotes: Quote[] = data['quotes'] || [];
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      window.chrome.tabs.sendMessage(tabId, { quote: quote || null });
    });
  }
});
