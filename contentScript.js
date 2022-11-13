const elementInject = document.createElement("script")
  elementInject.src = chrome.runtime.getURL("script.js")
  elementInject.onload = function () { this.remove() }
  document.head.appendChild(elementInject)
