const addElement = document.createElement('script')
addElement.src = chrome.runtime.getURL('script.js')
addElement.onload = function () { this.remove() }
document.head.appendChild(addElement)

const LOCAL_STORAGE_NAME = 'TRVerifiedConfig'

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.config) {
      saveChanges(request.config)
    }
    if (request.loadConfig) {
      const getLocalStorage = localStorage.getItem(LOCAL_STORAGE_NAME)
      const parseConfig = JSON.parse(getLocalStorage)
      getLocalStorage ? sendResponse(parseConfig) : sendResponse('Not Found')
    }
  }
)

function saveChanges (configValues) {
  const convertedConfig = JSON.stringify(configValues)
  localStorage.setItem(LOCAL_STORAGE_NAME, convertedConfig)
}
