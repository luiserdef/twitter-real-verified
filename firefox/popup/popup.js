const colorPicker = document.getElementById('color-picker')
const blueBadgePopup = document.getElementById('blue-badge-popup')
const badgePickColor = document.querySelectorAll('.badge-pick-color')
const resetDefault = document.querySelector('.reset-default')
const btSaveAction = document.querySelector('.bt-save-action')
const infoSaveText = document.getElementById('info-save')
const configExtensionValues = {}
const defaultVerifyColor = '#1d9bf0'
let blueVerifiedBadgeColor = defaultVerifyColor

// Loading Config
document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await browser.tabs.query({ active: true, lastFocusedWindow: true })
  const configResponse = await browser.tabs.sendMessage(tab.id, {
    loadConfig: true
  })
  if (configResponse !== 'Not Found') {
    const badgeColorConfig = configResponse.badgeColor
    blueVerifiedBadgeColor = badgeColorConfig
    blueBadgePopup.style.fill = badgeColorConfig
  }
  badgePickColor.forEach(element => {
    element.style.fill = blueVerifiedBadgeColor
  })
})

// Change badge color options
colorPicker.addEventListener('input', (e) => {
  changeBadgeColor(e.target.value)
})

resetDefault.addEventListener('click', () => {
  changeBadgeColor(defaultVerifyColor)
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
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
  await browser.tabs.sendMessage(tab.id, {
    config: newConfig
  })
}