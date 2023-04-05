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
} else {
  // Aparently there is a bug that make this no work entirely (need to work around)
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1127196

  // chrome.runtime.onInstalled.addListener(() => {
  //   chrome.action.disable()
  //   chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
  //     const twitterRule = {
  //       conditions: [
  //         new chrome.declarativeContent.PageStateMatcher({
  //           pageUrl: { hostSuffix: '.twitter.com' }
  //         })
  //       ],
  //       actions: [new chrome.declarativeContent.ShowAction()]
  //     }
  //     chrome.declarativeContent.onPageChanged.addRules([twitterRule])
  //   })
  // })
}
