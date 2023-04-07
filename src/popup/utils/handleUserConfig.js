import { validateBrowserAPI as browserAPI } from '../../utils/validateUserBrowser'

export async function handleUserConfig (request, value) {
  return new Promise((resolve, reject) => {
    try {
      browserAPI().tabs.query({ active: true, lastFocusedWindow: true })
        .then(([tab]) => {
          browserAPI().tabs.sendMessage(tab.id, {
            [request]: value
          }, (response) => {
            if (!browserAPI().runtime.lastError) {
              resolve(response)
            } else {
              reject(new Error('request failed'))
            }
          })
        })
    } catch (e) {
      reject(new Error('request failed'))
    }
  })
}
