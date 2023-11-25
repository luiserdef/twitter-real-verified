
const browserStatus = typeof browser !== 'undefined'

function updateExtensionIconFirefox (url) {
  if (url === '') return
  if (url.startsWith('https://twitter.com/') || url.startsWith('https://tweetdeck.twitter.com/')) {
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
  const rule2 = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlPrefix: 'https://tweetdeck.twitter.com/' }
      })
    ],
    actions: [new chrome.declarativeContent.ShowAction()]
  }
  chrome.action.disable()
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([rule1])
    chrome.declarativeContent.onPageChanged.addRules([rule2])
  })
}

function runExtensionIconHandler () {
  if (browserStatus) {
    browser.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      updateExtensionIconFirefox(tabs[0].url)
    })
    browser.tabs.onActivated.addListener(function (activeInfo) {
      browser.tabs.get(activeInfo.tabId, function (tab) {
        updateExtensionIconFirefox(tab.url)
      })
    })
    browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      updateExtensionIconFirefox(tab.url)
    })
  } else {
    updateExtensionIconChrome()
  }
}

chrome.runtime.onInstalled.addListener((details) => {
  runExtensionIconHandler()

  // Show a notification in the extension icon when there are updates
  const isUIUpdate = true

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
            browser.browserAction.setBadgeText({ text: 'new' })
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

chrome.runtime.onStartup.addListener(() => {
  runExtensionIconHandler()
})
