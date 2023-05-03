/* eslint-disable no-undef */
// Wait until verifiedUserList1 and verifiedUserList2 is available.
// This comes from verifiedUserList1.js and verifiedUserList2.js

export const loadVerifiedList1 = new Promise((resolve) => {
  if (typeof verifiedUserList1 !== 'undefined') {
    resolve(verifiedUserList1)
  } else {
    const intervalId = setInterval(() => {
      if (typeof verifiedUserList1 !== 'undefined') {
        clearInterval(intervalId)
        resolve(verifiedUserList1)
      }
    }, 10)
  }
})

export const loadVerifiedList2 = new Promise((resolve) => {
  if (typeof verifiedUserList2 !== 'undefined') {
    resolve(verifiedUserList2)
  } else {
    const intervalId = setInterval(() => {
      if (typeof verifiedUserList2 !== 'undefined') {
        clearInterval(intervalId)
        resolve(verifiedUserList2)
      }
    }, 10)
  }
})
