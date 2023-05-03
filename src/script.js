import { elementsPaths, propsPaths } from './utils/screenNamePaths'
import { loadVerifiedList1, loadVerifiedList2 } from './utils/loadVerifiedList'
import { getMainReactProps } from './utils/getMainReactProps'
import { retrieveData } from './utils/retrieveNewData'
import {
  CLOWN,
  LOCAL_STORAGE,
  DEFAULT_CONFIG,
  VERIFIED_TYPE,
  BADGE_CLASS_TARGET,
  TWITTER_BLUE_BADGE,
  VERIFIED_BADGE
} from './constants'

let userBadgeColors = DEFAULT_CONFIG.badgeColors
let userOptions = DEFAULT_CONFIG.options

const localStorageConfig = localStorage.getItem(LOCAL_STORAGE)
if (localStorageConfig) {
  const currentUserConfig = retrieveData(JSON.parse(localStorageConfig))
  userBadgeColors = currentUserConfig.badgeColors
  userOptions = currentUserConfig.options
}

function getParentElementByLevel (element, parentLevel) {
  let parentTarget = element
  let level = 0
  while (level < parentLevel) {
    parentTarget = parentTarget.parentElement
    level++
  }
  return parentTarget
}

function findElementBadge (element) {
  if (BADGE_CLASS_TARGET === element.className) {
    const profileBadgeHeading = getParentElementByLevel(element, 6)

    if (profileBadgeHeading?.tagName !== 'H2') {
      handleVerificationStatus(element)
    }

    // Header title on a user's profile
    if (profileBadgeHeading?.tagName === 'H2') {
      handleVerificationStatus(element, { isViewingUserProfile: true })
    }

    // Username, below profile photo
    const profileBadgeUsername = getParentElementByLevel(element, 9)
    if (profileBadgeUsername?.dataset?.testid === 'UserName') {
      handleVerificationStatus(element, { isViewingUserProfile: true, isSecondBadgeProfile: true })
    }
  }

  // Checks for changes when switching between user profiles
  // e.g. user profile1 --> user profile 2
  // In this case MutationObserver doesn't detect changes for both badges
  // so you can't retrieve updated props of the user
  // UserProfileSchema-test act like a trigger at this moment.
  if (element?.dataset?.testid === 'UserProfileSchema-test' || element.dataset?.testid === 'UserDescription') {
    const badgeElements = document.querySelectorAll(`.${BADGE_CLASS_TARGET.replaceAll(' ', '.')}`)

    for (let i = 0; i < badgeElements.length; i++) {
      const profileHeadingPath = getParentElementByLevel(badgeElements[i], 6)
      if (profileHeadingPath?.tagName === 'H2') {
        // Header title on a user's profile
        handleVerificationStatus(badgeElements[i], { isViewingUserProfile: true })

        // username, below profile photo
        handleVerificationStatus(badgeElements[i + 1], { isViewingUserProfile: true, isSecondBadgeProfile: true })

        break
      }
    }
  }

  if (element.childNodes) {
    [...element.childNodes].forEach(findElementBadge)
  }
}

async function handleVerificationStatus (element, elementOptions) {
  const parentLevel = elementOptions?.isSecondBadgeProfile ? 6 : 3
  const elementProps = getMainReactProps(getParentElementByLevel(element, parentLevel), element)

  if (elementProps === undefined) return

  if (elementOptions?.isViewingUserProfile && element.firstChild?.tagName === 'svg') {
    if (element.firstChild.id === VERIFIED_TYPE.LEGACY_VERIFIED) {
      element.removeChild(element.firstChild)
    }
  }

  const currentVerifiedType = elementProps.verifiedType
  const isBlueVerified = elementProps.isBlueVerified
  const isUserVerified = await isUserLegacyVerified(element)

  if (isBlueVerified) {
    if (isUserVerified && userOptions.revokeLegacyVerifiedBadge === false) {
      createBadge(element, VERIFIED_TYPE.LEGACY_VERIFIED, userBadgeColors.verifiedAndWithTwitterBlue, currentVerifiedType)
    } else {
      createBadge(element, VERIFIED_TYPE.TWITTER_BLUE, userBadgeColors.twitterBlue, currentVerifiedType, elementOptions?.isViewingUserProfile)
    }
  } else {
    if (isUserVerified) createBadge(element, VERIFIED_TYPE.LEGACY_VERIFIED, userBadgeColors.verified, currentVerifiedType)
  }
}

async function isUserLegacyVerified (element) {
  const posibleElementPaths = elementsPaths(element)

  for (let i = 0; i < posibleElementPaths.length; i++) {
    if (posibleElementPaths[i] === undefined) continue

    const currentElement = posibleElementPaths[i]
    const reactProps = currentElement[Object.keys(currentElement).find(k => k.startsWith('__reactProps$'))]
    const currentUser = propsPaths(reactProps)

    if (currentUser !== undefined) {
      const legacyUsers1 = await loadVerifiedList1
      const legacyUsers2 = await loadVerifiedList2

      for (let index = 0; index < legacyUsers1.length; index++) {
        if (legacyUsers1[index].key === currentUser[0]) {
          if (legacyUsers1[index].users.some(user => user === currentUser)) {
            return true
          }
        }
      }
      for (let index = 0; index < legacyUsers2.length; index++) {
        if (legacyUsers2[index].key === currentUser[0]) {
          if (legacyUsers2[index].users.some(user => user === currentUser)) {
            return true
          }
        }
      }
      return false
    }
  }
  return false
}

// There is a special case for both two badges in a user profile
// svg element can't be eliminated, that trown a error when is switching between user profiles
// error: Something went wrong, but don’t fret — it’s not your fault.

function createBadge (element, userVerifiedStatus, badgeColor, currentVerifiedType, isViewingUserProfile) {
  let svgElementG = element
  while (svgElementG !== null && svgElementG.tagName !== 'g') {
    svgElementG = svgElementG.firstChild
  }

  if (svgElementG !== null) {
    if (currentVerifiedType === VERIFIED_TYPE.BUSINESS || currentVerifiedType === VERIFIED_TYPE.GOVERNMENT) {
      return
    }
  }

  if (userOptions.hideTwitterBlueBadge && userVerifiedStatus === VERIFIED_TYPE.TWITTER_BLUE) {
    if (svgElementG !== null) {
      if (!isViewingUserProfile) {
        const parentSvgElementG = svgElementG.parentElement.parentElement
        parentSvgElementG.removeChild(parentSvgElementG.firstChild)
        return
      } else {
        const parentSvgElementG = svgElementG.parentElement
        parentSvgElementG.removeChild(parentSvgElementG.firstChild)
        const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        parentSvgElementG.appendChild(gElement)
        return
      }
    } else {
      return
    }
  }

  const badge = userVerifiedStatus === VERIFIED_TYPE.LEGACY_VERIFIED ? VERIFIED_BADGE : TWITTER_BLUE_BADGE

  const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  if (userOptions.replaceTBWithClown && userVerifiedStatus === VERIFIED_TYPE.TWITTER_BLUE) {
    gElement.innerHTML = CLOWN
  } else {
    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    pathElement.setAttribute('fill', badgeColor)
    pathElement.setAttribute('d', badge)
    gElement.appendChild(pathElement)
  }

  if (svgElementG !== null) {
    const parentElement = svgElementG.parentElement
    parentElement.removeChild(svgElementG)
    parentElement.appendChild(gElement)
  } else {
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgElement.id = VERIFIED_TYPE.LEGACY_VERIFIED
    svgElement.setAttribute('viewBox', '0 0 22 22')
    svgElement.setAttribute('class', 'r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr')

    svgElement.appendChild(gElement)
    element.appendChild(svgElement)
  }
}

const observer = new MutationObserver(callbackObserver)

function callbackObserver (mutationList) {
  for (const mutation of mutationList) {
    for (node of mutation.addedNodes) {
      findElementBadge(node)
    }
  }
}

observer.observe(document, {
  childList: true,
  subtree: true
})
