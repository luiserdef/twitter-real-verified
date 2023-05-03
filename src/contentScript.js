import { validateBrowserAPI as browserAPI } from './utils/validateUserBrowser'
import { LOCAL_STORAGE, CONFIG_REQUEST } from './constants'

const addElementVerifiedList = document.createElement('script')
addElementVerifiedList.src = browserAPI().runtime.getURL('verifiedUserList1.js')
document.head.appendChild(addElementVerifiedList)
addElementVerifiedList.onload = function () { this.remove() }

const addElementVerifiedList2 = document.createElement('script')
addElementVerifiedList2.src = browserAPI().runtime.getURL('verifiedUserList2.js')
document.head.appendChild(addElementVerifiedList2)
addElementVerifiedList2.onload = function () { this.remove() }

const addElementScript = document.createElement('script')
addElementScript.src = browserAPI().runtime.getURL('script.js')
document.head.appendChild(addElementScript)
addElementScript.onload = function () { this.remove() }

browserAPI().runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request[CONFIG_REQUEST.SAVE]) {
    saveChanges(request[CONFIG_REQUEST.SAVE])
    sendResponse({ status: true, content: request[CONFIG_REQUEST.SAVE], message: 'Saved Settings' })
  }
  if (request[CONFIG_REQUEST.LOAD]) {
    const getLocalStorage = localStorage.getItem(LOCAL_STORAGE)
    if (getLocalStorage !== null) {
      sendResponse({ status: true, content: JSON.parse(getLocalStorage), message: 'Config Loaded' })
    } else {
      sendResponse({ status: true, content: null, message: 'There is no data saved' })
    }
  }
})

function saveChanges (configValues) {
  const convertedConfig = JSON.stringify(configValues)
  localStorage.setItem(LOCAL_STORAGE, convertedConfig)
}
