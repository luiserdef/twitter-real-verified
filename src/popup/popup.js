let browserAPI = chrome
if (typeof browser !== 'undefined') {
  browserAPI = browser
}
const colorPicker = document.getElementById('color-picker')
const blueBadgePopup = document.getElementById('blue-badge-popup')
const badgePickColor = document.querySelectorAll('.badge-pick-color')
const resetDefault = document.querySelector('.reset-default')
const btSaveAction = document.querySelector('.bt-save-action')
const infoSaveText = document.getElementById('save-alert')
const configExtensionValues = {}
const defaultVerifyColor = '#1d9bf0'
let blueVerifiedBadgeColor = defaultVerifyColor
document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await browserAPI.tabs.query({ active: true, lastFocusedWindow: true })
  browserAPI.tabs.sendMessage(tab.id, {
    requestConfig: true
  }, (reponse) => {
    // If the user opens the browser outside of twitter.com, a communication error is thrown when the extension is opened
    // This validation allows the extension to display its content when the user is on twitter.com
    // and prevents it from showing content when the user is not on the website.
    if (!browserAPI.runtime.lastError) {
      if (reponse !== 'Not Found') {
        blueVerifiedBadgeColor = reponse.badgeColor
        blueBadgePopup.style.fill = reponse.badgeColor
      }
      badgePickColor.forEach(element => {
        element.style.fill = blueVerifiedBadgeColor
      })
      colorPicker.style.background = blueVerifiedBadgeColor
    } else {
      const contentPopup = document.getElementById('content-popup')
      contentPopup.parentNode.removeChild(contentPopup)

      const content = document.querySelector('.content')
      const hElement = document.createElement('h1')
      hElement.textContent = 'Make sure you are on Twitter'
      hElement.style.fontSize = '1rem'
      content.appendChild(hElement)
    }
  })
})

// Change badge color options
colorPicker.addEventListener('input', (e) => {
  changeBadgeColor(e.target.value)
  colorPicker.style.background = blueVerifiedBadgeColor
})

resetDefault.addEventListener('click', () => {
  changeBadgeColor(defaultVerifyColor)
  colorPicker.style.background = blueVerifiedBadgeColor
})

function changeBadgeColor (color) {
  badgePickColor.forEach(element => {
    element.style.fill = color
  })
  activateChangeOptions()
  blueVerifiedBadgeColor = color
}

btSaveAction.addEventListener('click', () => {
  infoSaveText.style.display = 'block'
  saveChanges('badgeColor', blueVerifiedBadgeColor)
})

function activateChangeOptions () {
  btSaveAction.removeAttribute('disabled')
  btSaveAction.classList.add('bt-save')
}

function saveChanges (configKey, configValue) {
  const newValues = {
    ...configExtensionValues,
    [configKey]: configValue
  }
  sendConfig(newValues)
}

async function sendConfig (newConfig) {
  const [tab] = await browserAPI.tabs.query({ active: true, currentWindow: true })
  await browserAPI.tabs.sendMessage(tab.id, {
    saveConfig: newConfig
  })
}
