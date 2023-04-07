import { validateBrowserAPI as browserAPI } from './utils/validateUserBrowser'

const addElement = document.createElement('script')
addElement.src = chrome.runtime.getURL('script.js')
addElement.onload = function () { this.remove() }
document.head.appendChild(addElement)

const LOCAL_STORAGE_NAME = 'TRVerifiedConfig'
browserAPI().runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.saveConfig) {
    saveChanges(request.saveConfig)
    sendResponse({ status: 'correct', content: null, message: 'Saved Settings' })
  }
  if (request.getConfig) {
    const getLocalStorage = localStorage.getItem(LOCAL_STORAGE_NAME)
    if (getLocalStorage !== null) {
      sendResponse({ status: 'correct', content: JSON.parse(getLocalStorage), message: 'Config Loaded' })
    } else {
      sendResponse({ status: 'correct', content: null, message: 'There is no data saved' })
    }
  }
})

function saveChanges (configValues) {
  const convertedConfig = JSON.stringify(configValues)
  localStorage.setItem(LOCAL_STORAGE_NAME, convertedConfig)
}
