// Wait until verifiedUsers_ID_1 and verifiedUsers_ID_2 is available.
// This comes from verifiedUsersID1.js and verifiedUsersID2.js

export const loadVerifiedListID1 = new Promise((resolve) => {
  if (typeof verifiedUsers_ID_1 !== 'undefined') {
    resolve(verifiedUsers_ID_1)
  } else {
    const intervalId = setInterval(() => {
      if (typeof verifiedUsers_ID_1 !== 'undefined') {
        clearInterval(intervalId)
        resolve(verifiedUsers_ID_1)
      }
    }, 10)
  }
})

export const loadVerifiedListID2 = new Promise((resolve) => {
  if (typeof verifiedUsers_ID_2 !== 'undefined') {
    resolve(verifiedUsers_ID_2)
  } else {
    const intervalId = setInterval(() => {
      if (typeof verifiedUsers_ID_2 !== 'undefined') {
        clearInterval(intervalId)
        resolve(verifiedUsers_ID_2)
      }
    }, 10)
  }
})

// Wait until verifiedUsers_ScreenName_1 and verifiedUsers_ScreenName_2 is available.
// This comes from verifiedUsersScreenName1.js and verifiedUsersScreenName2.js

export const loadVerifiedListScreenName1 = new Promise((resolve) => {
  if (typeof verifiedUsers_ScreenName_1 !== 'undefined') {
    resolve(verifiedUsers_ScreenName_1)
  } else {
    const intervalId = setInterval(() => {
      if (typeof verifiedUsers_ScreenName_1 !== 'undefined') {
        clearInterval(intervalId)
        resolve(verifiedUsers_ScreenName_1)
      }
    }, 10)
  }
})

export const loadVerifiedListScreenName2 = new Promise((resolve) => {
  if (typeof verifiedUsers_ScreenName_2 !== 'undefined') {
    resolve(verifiedUsers_ScreenName_2)
  } else {
    const intervalId = setInterval(() => {
      if (typeof verifiedUsers_ScreenName_2 !== 'undefined') {
        clearInterval(intervalId)
        resolve(verifiedUsers_ScreenName_2)
      }
    }, 10)
  }
})
