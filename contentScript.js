const addElement = document.createElement("script")
  addElement.src = chrome.runtime.getURL("script.js")
  addElement.onload = function () { this.remove() }
  document.head.appendChild(addElement)
