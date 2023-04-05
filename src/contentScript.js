let browserAPI = chrome
if (typeof browser !== 'undefined') {
  browserAPI = browser
}

const addElement = document.createElement('script')
addElement.src = browserAPI.runtime.getURL('script.js')
addElement.onload = function () { this.remove() }
document.head.appendChild(addElement)

const LOCAL_STORAGE_NAME = 'TRVerifiedConfig'
browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.saveConfig) {
    saveChanges(request.saveConfig)
  }
  if (request.requestConfig) {
    const getLocalStorage = localStorage.getItem(LOCAL_STORAGE_NAME)
    if (getLocalStorage !== null) {
      sendResponse(JSON.parse(getLocalStorage))
    } else {
      sendResponse('Not Found')
    }
  }
})

function saveChanges (configValues) {
  const convertedConfig = JSON.stringify(configValues)
  localStorage.setItem(LOCAL_STORAGE_NAME, convertedConfig)
}
