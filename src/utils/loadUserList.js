
export const verifiedUsers1Promise = new Promise((resolve) => {
  if (typeof verifiedusersList1 !== 'undefined') {
    resolve(verifiedusersList1)
  } else {
    // Wait until verifiedusersList1 is available
    const intervalId = setInterval(() => {
      if (typeof verifiedusersList1 !== 'undefined') {
        clearInterval(intervalId)
        resolve(verifiedusersList1)
      }
    }, 10)
  }
})

export const verifiedUsers2Promise = new Promise((resolve) => {
  if (typeof verifiedusersList2 !== 'undefined') {
    resolve(verifiedusersList2)
  } else {
    // Wait until verifiedusersList2 is available
    const intervalId = setInterval(() => {
      if (typeof verifiedusersList2 !== 'undefined') {
        clearInterval(intervalId)
        resolve(verifiedusersList2)
      }
    }, 10)
  }
})
