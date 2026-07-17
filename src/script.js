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

function cleanVerifiedBadges (element) {
  if (element.childNodes === 1) return element
  const currentElement = element
  const badges = currentElement.childNodes

  for (let ind = 0; ind < badges.length; ind++) {
    if (badges[ind].tagName === 'svg' && badges[ind].id === VERIFIED_TYPE.LEGACY_VERIFIED) {
      currentElement.removeChild(badges[ind])
    }
  }
  return currentElement
}

async function handleVerificationStatus (element, elementOptions) {
  const parentLevel = elementOptions?.isSecondBadgeProfile ? 6 : 3
  const elementProps = getMainReactProps(getParentElementByLevel(element, parentLevel), element)

  if (elementProps === undefined) return

  const accountVerifiedType = elementProps.verifiedType
  const isBlueVerified = elementProps.isBlueVerified
  const isUserVerified = await isUserLegacyVerified(element)

  const badgeConfig = {
    accountVerifiedType,
    element: cleanVerifiedBadges(element),
    isViewingUserProfile: elementOptions?.isViewingUserProfile
  }

  if (isBlueVerified) {
    if (isUserVerified && userOptions.revokeLegacyVerifiedBadge === false) {
      createBadge(badgeConfig, VERIFIED_TYPE.LEGACY_VERIFIED, userBadgeColors.verifiedAndWithTwitterBlue)
    } else {
      createBadge(badgeConfig, VERIFIED_TYPE.TWITTER_BLUE, userBadgeColors.twitterBlue)
    }
  } else {
    if (isUserVerified) createBadge(badgeConfig, VERIFIED_TYPE.LEGACY_VERIFIED, userBadgeColors.verified)
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

function simpleCheckmark () {
  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svgElement.setAttribute('viewBox', '30 110 300 300')
  svgElement.id = VERIFIED_TYPE.LEGACY_VERIFIED
  svgElement.setAttribute('class', 'r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr')

  const ellipse1 = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
  ellipse1.setAttribute('style', 'stroke: rgb(0, 0, 0); fill: #3e9a19;')
  ellipse1.setAttribute('cx', '186.447')
  ellipse1.setAttribute('cy', '260.885')
  ellipse1.setAttribute('rx', '121.138')
  ellipse1.setAttribute('ry', '121.138')
  svgElement.appendChild(ellipse1)

  const ellipse2 = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
  ellipse2.setAttribute('style', 'stroke: rgb(0, 0, 0); fill: #ffffff;')
  ellipse2.setAttribute('cx', '186.446')
  ellipse2.setAttribute('cy', '261.587')
  ellipse2.setAttribute('rx', '110.253')
  ellipse2.setAttribute('ry', '110.253')
  svgElement.appendChild(ellipse2)

  const ellipse3 = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
  ellipse3.setAttribute('style', 'stroke: rgb(0, 0, 0); fill: #3e9a19;')
  ellipse3.setAttribute('cx', '186.447')
  ellipse3.setAttribute('cy', '260.884')
  ellipse3.setAttribute('rx', '95.857')
  ellipse3.setAttribute('ry', '95.857')
  svgElement.appendChild(ellipse3)

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('style', 'stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255);')
  path.setAttribute('d', 'M 124.297 258.426 L 165.73 290.029 L 233.849 185.393 L 257.724 212.781 L 173.455 336.376 L 106.742 283.708 L 124.297 258.426 Z')
  svgElement.appendChild(path)

  return svgElement
}

function createBadge (badgeConfig, userVerifiedType, badgeColor) {
  const element = badgeConfig.element
  const accountVerifiedType = badgeConfig.accountVerifiedType

  if (userOptions.simpleCheckmark) {
    if (userVerifiedType === VERIFIED_TYPE.TWITTER_BLUE) return

    element.appendChild(simpleCheckmark())
    return
  }

  // There is a special case for both badges in a user profile
  // if a Badge exists, svg element can't be eliminated, that trown an error when is switching between user profiles
  // error: Something went wrong, but don’t fret — it’s not your fault.
  // That's why the g element is replaced instead of the svg."
  let svgElementG = element
  while (svgElementG !== null && svgElementG.tagName !== 'g') {
    svgElementG = svgElementG.firstChild
  }

  if (svgElementG !== null) {
    if (accountVerifiedType === VERIFIED_TYPE.BUSINESS || accountVerifiedType === VERIFIED_TYPE.GOVERNMENT) {
      return
    }
  }

  if (userOptions.hideTwitterBlueBadge && userVerifiedType === VERIFIED_TYPE.TWITTER_BLUE) {
    if (svgElementG !== null) {
      if (badgeConfig.isViewingUserProfile) {
        const svg = svgElementG.parentElement
        svg.removeChild(svg.firstChild)
        const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        svg.appendChild(gElement)
        return
      } else {
        const svgParent = svgElementG.parentElement.parentElement
        svgParent.removeChild(svgParent.firstChild)
        return
      }
    } else {
      return
    }
  }

  const badge = userVerifiedType === VERIFIED_TYPE.LEGACY_VERIFIED ? VERIFIED_BADGE : TWITTER_BLUE_BADGE

  const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')

  if (userOptions.replaceTBWithClown && userVerifiedType === VERIFIED_TYPE.TWITTER_BLUE) {
    gElement.innerHTML = CLOWN
  } else {
    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    pathElement.setAttribute('fill', badgeColor)
    pathElement.setAttribute('d', badge)
    gElement.appendChild(pathElement)
  }

  // Returns true if the current account is a private account and doesn't have any type of verification badge.
  const isLockedAccount = element?.firstChild?.dataset?.testid === 'icon-lock'

  if (svgElementG !== null && isLockedAccount === false) {
    const parentElement = svgElementG.parentElement
    parentElement.removeChild(svgElementG)
    parentElement.appendChild(gElement)
  }

  if (svgElementG === null || isLockedAccount) {
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
