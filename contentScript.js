const elementInject = document.createElement("script")
  elementInject.src = chrome.runtime.getURL("script.js")
  elementInject.onload = function () { this.remove() }
  document.body.appendChild(elementInject)

  console.log("someone listenins?")
  
  chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        try{
            console.log(request.checkRemoveBadges)
        }catch(error){
            sendResponse({status:"error al enviar"})
        }
    }
)

var data = {
  allowedTypes: 'those supported by structured cloning, see the list below',
  inShort: 'no DOM elements or classes/functions',
};

document.dispatchEvent(new CustomEvent('yourCustomEvent', { detail: data }));
