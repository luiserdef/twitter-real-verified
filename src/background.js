
const browserStatus = typeof browser !== 'undefined'

function updateExtensionIcon (url) {
  if (url === '') return
  if (url.startsWith('https://twitter.com/')) {
    browser.browserAction.enable()
  } else {
    browser.browserAction.disable()
  }
}

function updateExtensionIconChrome () {
  const rule1 = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlPrefix: 'https://twitter.com/' }
      })
    ],
    actions: [new chrome.declarativeContent.ShowAction()]
  }
  chrome.action.disable()
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([rule1])
  })
}

if (browserStatus) {
  browser.tabs.onActivated.addListener(function (activeInfo) {
    browser.tabs.get(activeInfo.tabId, function (tab) {
      updateExtensionIcon(tab.url)
    })
  })

  browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    updateExtensionIcon(tab.url)
  })
}

chrome.runtime.onInstalled.addListener((details) => {
  if (browserStatus) {
    browser.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      updateExtensionIcon(tabs[0].url)
    })
  } else {
    updateExtensionIconChrome()
  }

  // Show a notification in the extension icon when there are UI updates within the PopUp
  const isUIUpdate = false

  if (isUIUpdate) {
    const currentVersion = chrome.runtime.getManifest().version
    const previousVersion = details.previousVersion
    const reason = details.reason

    switch (reason) {
      case 'install':
        break
      case 'update':
        if (currentVersion > previousVersion) {
          const color = { color: '#26ff26' }
          if (browserStatus) {
            browser.browserAction.setBadgeText({ text: '*' })
            browser.browserAction.setBadgeBackgroundColor(color)
          } else {
            chrome.action.setBadgeText({ text: 'New' })
            chrome.action.setBadgeBackgroundColor(color)
          }
        }
        break
      case 'chrome_update':
      case 'shared_module_update':
      default:
        console.log('Other install events within the browser')
        break
    }
  }
})
