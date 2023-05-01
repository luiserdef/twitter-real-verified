// Make extension only available on the Twitter.com domain
if (typeof browser !== 'undefined') {
  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const tabURL = tab.url
    if (tabURL.startsWith('https://twitter.com/')) {
      browser.browserAction.enable(tabId)
    } else {
      browser.browserAction.disable(tabId)
    }
  })
}
