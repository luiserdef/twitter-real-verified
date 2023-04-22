import { validateBrowserAPI as browserAPI } from './utils/validateUserBrowser'
import { LOCAL_STORAGE } from './constants/localStorage'

const addElementVerifiedList1 = document.createElement('script')
addElementVerifiedList1.src = browserAPI().runtime.getURL('legacyVerifiedUsers1.js')
document.head.appendChild(addElementVerifiedList1)
addElementVerifiedList1.onload = function () { this.remove() }

const addElementVerifiedList2 = document.createElement('script')
addElementVerifiedList2.src = browserAPI().runtime.getURL('legacyVerifiedUsers2.js')
document.head.appendChild(addElementVerifiedList2)
addElementVerifiedList2.onload = function () { this.remove() }

const addElementScript = document.createElement('script')
addElementScript.src = browserAPI().runtime.getURL('script.js')
document.head.appendChild(addElementScript)
addElementScript.onload = function () { this.remove() }

browserAPI().runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.saveConfig) {
    saveChanges(request.saveConfig)
    sendResponse({ status: 'correct', content: null, message: 'Saved Settings' })
  }
  if (request.getConfig) {
    const getLocalStorage = localStorage.getItem(LOCAL_STORAGE)
    if (getLocalStorage !== null) {
      sendResponse({ status: 'correct', content: JSON.parse(getLocalStorage), message: 'Config Loaded' })
    } else {
      sendResponse({ status: 'correct', content: null, message: 'There is no data saved' })
    }
  }
})

function saveChanges (configValues) {
  const convertedConfig = JSON.stringify(configValues)
  localStorage.setItem(LOCAL_STORAGE, convertedConfig)
}
