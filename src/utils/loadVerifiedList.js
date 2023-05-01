/* eslint-disable no-undef */
// Wait until verifiedUsers is available. This comes from verifiedUsers.jsonx
export const loadVerifiedList = new Promise((resolve) => {
  if (typeof verifiedUsers !== 'undefined') {
    resolve(verifiedUsers)
  } else {
    const intervalId = setInterval(() => {
      if (typeof verifiedUsers !== 'undefined') {
        clearInterval(intervalId)
        resolve(verifiedUsers)
      }
    }, 10)
  }
})
