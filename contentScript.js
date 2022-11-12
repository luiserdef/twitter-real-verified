const elementInject = document.createElement("script", { id: "real-verification" })
  elementInject.src = chrome.runtime.getURL("script.js")
  elementInject.onload = function () { this.remove() }
  document.head.appendChild(elementInject)