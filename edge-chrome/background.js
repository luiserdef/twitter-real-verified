// make extension only available on the Twitter site
const rule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostSuffix: '.twitter.com', schemes: ['https'] }
    })
  ],
  actions: [new chrome.declarativeContent.ShowAction()]
}

chrome.runtime.onInstalled.addListener(function (details) {
  chrome.action.disable()
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([rule])
  })
})
