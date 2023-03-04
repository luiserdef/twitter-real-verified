const addElement = document.createElement("script")

addElement.src = chrome.runtime.getURL("script.js")
  addElement.onload = function () { this.remove() }
  document.head.appendChild(addElement)

  const LOCAL_STORAGE_NAME = "TRVerifiedConfig"

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.config)
        sendResponse("config saved");
        saveChanges(request.config)
    }
  );

  function saveChanges(configValues){
    localStorage.setItem(LOCAL_STORAGE_NAME,configValues)
  }