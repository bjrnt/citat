const DEFAULT_QUOTE = {
  text: 'Go to chrome://extensions to add your first quote!',
  author: 'Citat Authors',
  reference: null,
};

window.chrome.tabs.onUpdated.addListener((tabId, changes, tab) => {
  if (tab.url === 'chrome://newtab/' && changes.status === 'complete') {
    const quotes = chrome.storage.sync.get(data => {
      const quotes = data['quotes'] || [];
      const quote = quotes[Math.floor(Math.random() * quotes.length)] || DEFAULT_QUOTE;
      window.chrome.tabs.sendMessage(tabId, quote);
    });
  }
});
