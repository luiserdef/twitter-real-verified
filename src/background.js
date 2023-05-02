import { validateBrowserAPI as browserAPI } from './utils/validateUserBrowser'

browserAPI().tabs.onActivated.addListener(function (activeInfo) {
  browserAPI().tabs.get(activeInfo.tabId, function (tab) {
    updateToolbarIcon(tab.url)
  })
})

browserAPI().tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  updateToolbarIcon(tab.url)
})

function updateToolbarIcon (url) {
  if (url === '') return
  if (url.startsWith('https://twitter.com/') || url.startsWith('https://mobile.twitter.com/')) {
    typeof browser !== 'undefined' ? browser.browserAction.enable() : chrome.action.enable()
  } else {
    typeof browser !== 'undefined' ? browser.browserAction.disable() : chrome.action.disable()
  }
}

chrome.runtime.onInstalled.addListener((details) => {
  browserAPI().tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    updateToolbarIcon(tabs[0].url)
  })
  const currentVersion = browserAPI().runtime.getManifest().version
  const previousVersion = details.previousVersion
  const reason = details.reason

  switch (reason) {
    case 'install':
      break
    case 'update':
      if (currentVersion > previousVersion) {
        const text = { text: 'New' }
        const color = { color: '#26ff26' }
        if (typeof browser !== 'undefined') {
          browser.browserAction.setBadgeText({ text: '*' })
          browser.browserAction.setBadgeBackgroundColor(color)
        } else {
          chrome.action.setBadgeText(text)
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
})
