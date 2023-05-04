import { validateBrowserAPI as browserAPI } from './utils/validateUserBrowser'
import { LOCAL_STORAGE, CONFIG_REQUEST } from './constants'

const addIds1 = document.createElement('script')
addIds1.src = browserAPI().runtime.getURL('verifiedUsersID1.js')
document.head.appendChild(addIds1)
addIds1.onload = function () { this.remove() }

const addIds2 = document.createElement('script')
addIds2.src = browserAPI().runtime.getURL('verifiedUsersID2.js')
document.head.appendChild(addIds2)
addIds2.onload = function () { this.remove() }

const addScreenNames1 = document.createElement('script')
addScreenNames1.src = browserAPI().runtime.getURL('verifiedUsersScreenName1.js')
document.head.appendChild(addScreenNames1)
addScreenNames1.onload = function () { this.remove() }

const addScreenNames2 = document.createElement('script')
addScreenNames2.src = browserAPI().runtime.getURL('verifiedUsersScreenName2.js')
document.head.appendChild(addScreenNames2)
addScreenNames2.onload = function () { this.remove() }

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
