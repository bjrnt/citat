window.chrome.tabs.onUpdated.addListener((tabId, changes, tab) => {
  if (tab.url === 'chrome://newtab/' && changes.status === 'complete') {
    window.chrome.tabs.sendMessage(tabId, {
      text: 'Dwell on the beauty of life. Watch the stars, and see yourself running with them.',
      author: 'Marcus Aurelius',
      reference: 'Meditations'
    })
  }
})
