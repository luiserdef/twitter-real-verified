import { findUserName } from './utils/findUserName'
import { elementsPaths, propsPaths } from './utils/elementPathsUserName'
import { verifiedUsers1Promise as loadUserList1, verifiedUsers2Promise as loadUserList2 } from './utils/loadUserList'
import { LOCAL_STORAGE } from './constants/localStorage'
import {
  BADGE_CLASS_TARGET,
  BLUE_VERIFIED_BADGE,
  VERIFIED_BADGE,
  VERIFIED_BADGE_DEFAULT_COLOR
} from './constants/badge'

let usersList1 = []
let usersList2 = []

loadUserList1.then((vUsersList1) => {
  usersList1 = vUsersList1
})

loadUserList2.then((vUsersList2) => {
  usersList2 = vUsersList2
})

let blueVerifiedBadgeColor = VERIFIED_BADGE_DEFAULT_COLOR
let hideTwitterBlueBadge = false

const localStorageConfig = localStorage.getItem(LOCAL_STORAGE)
if (localStorageConfig) {
  const actualConfig = JSON.parse(localStorageConfig)
  blueVerifiedBadgeColor = actualConfig.badgeColor
  hideTwitterBlueBadge = actualConfig.hideTwitterBlueBadge
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

    // username, below profile photo
    const profileBadgeUsername = getParentElementByLevel(element, 9)
    if (profileBadgeUsername?.dataset?.testid === 'UserName') {
      handleVerificationStatus(element, { isViewingUserProfile: true, isSecondBadgeProfile: true })
    }
  }

  // Checks for changes when switching between user profiles
  // e.g. user profile1 --> user profile 2
  // In this case MutationObserver doesn't detect changes for both badges
  // so you can't retrieve updated props of the user
  // Changes in description act like a trigger at this moment. (This could be improved)
  if (element.dataset?.testid === 'UserDescription') {
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

function handleVerificationStatus (element, options) {
  let elementProps
  if (options?.isSecondBadgeProfile) {
    elementProps = getMainReactProps(getParentElementByLevel(element, 6), element)
  } else {
    elementProps = getMainReactProps(getParentElementByLevel(element, 3), element)
  }

  if (elementProps === undefined) return

  if (options?.isViewingUserProfile && element.firstChild?.tagName === 'svg') {
    if (element.firstChild.id === 'legacy') {
      element.removeChild(element.firstChild)
    }
  }

  const verifiedType = elementProps.verifiedType
  const isBlueVerified = elementProps.isBlueVerified
  const isUserVerified = isUserLegacyVerified(element)

  if (isBlueVerified) {
    if (isUserVerified) {
      createBadge(element, 'verified', verifiedType)
    } else {
      createBadge(element, 'blueVerified', verifiedType, options?.isViewingUserProfile)
    }
  } else {
    if (isUserVerified) createBadge(element, 'verified', verifiedType)
  }
}

function legacyUserExists (actualUser) {
  for (let index = 0; index < usersList1.length; index++) {
    if (usersList1[index].key === actualUser[0]) {
      if (findUserName(usersList1[index].users, actualUser) !== -1) {
        return true
      }
    }
  }

  for (let index = 0; index < usersList2.length; index++) {
    if (usersList2[index].key === actualUser[0]) {
      if (findUserName(usersList2[index].users, actualUser) !== -1) {
        return true
      }
    }
  }

  return false
}

function isUserLegacyVerified (element) {
  const posibleElementPaths = elementsPaths(element)
  for (let i = 0; i < posibleElementPaths.length; i++) {
    const elementProps = posibleElementPaths[i] && getReactProps(posibleElementPaths[i])
    const actualUser = propsPaths(elementProps)
    if (elementProps !== undefined && actualUser !== undefined) {
      if (legacyUserExists(actualUser)) {
        return true
      } else {
        return false
      }
    }
  }
  return false
}

function getReactProps (element) {
  const elementPropsNames = Object.getOwnPropertyNames(element)
  const reactPropsTarget = elementPropsNames.find(nameProp => nameProp.startsWith('__reactProps'))
  const reactProps = element[reactPropsTarget]
  return reactProps
}

// There is a special case for both two badges in a user profile
// svg element can't be eliminated, that trown a error when is switching between user profiles
// error: Something went wrong, but don’t fret — it’s not your fault.

function createBadge (element, userVerifyStatus, verifiedType, isViewingUserProfile) {
  let svgElementG = element
  while (svgElementG !== null && svgElementG.tagName !== 'g') {
    svgElementG = svgElementG.firstChild
  }

  if (svgElementG !== null && (verifiedType === 'Business' || verifiedType === 'Government')) return

  if (hideTwitterBlueBadge && userVerifyStatus === 'blueVerified') {
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

  let BadgeColor = blueVerifiedBadgeColor
  let UserVerificationBadge = BLUE_VERIFIED_BADGE

  if (userVerifyStatus === 'verified') {
    UserVerificationBadge = VERIFIED_BADGE
    BadgeColor = VERIFIED_BADGE_DEFAULT_COLOR
  }

  const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  pathElement.setAttribute('fill', BadgeColor)
  pathElement.setAttribute('d', UserVerificationBadge)
  gElement.appendChild(pathElement)

  if (svgElementG !== null) {
    const parentElement = svgElementG.parentElement
    parentElement.removeChild(svgElementG)
    parentElement.appendChild(gElement)
  } else {
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svgElement.id = 'legacy'
    svgElement.setAttribute('viewBox', '0 0 22 22')
    svgElement.setAttribute('class', 'r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr')

    svgElement.appendChild(gElement)
    element.appendChild(svgElement)
  }
}

// https://stackoverflow.com/a/74240138/2230249
function getMainReactProps (parent, target) {
  const keyOfReactProps = Object.keys(parent).find(k => k.startsWith('__reactProps$'))
  const symofReactFragment = Symbol.for('react.fragment')

  // Find the path from target to parent
  const path = []
  let elem = target
  while (elem !== parent) {
    let index = 0
    for (let sibling = elem; sibling != null;) {
      if (sibling[keyOfReactProps]) index++
      sibling = sibling.previousElementSibling
    }
    path.push({ child: elem, index })
    elem = elem.parentElement
  }
  // Walk down the path to find the react state props
  let state = elem[keyOfReactProps]
  for (let i = path.length - 1; i >= 0 && state != null; i--) {
    // Find the target child state index
    let childStateIndex = 0; let childElemIndex = 0
    while (childStateIndex < state.children.length) {
      const childState = state.children[childStateIndex]
      if (childState instanceof Object) {
        // Fragment children are inlined in the parent DOM element
        const isFragment = childState.type === symofReactFragment && childState.props.children.length
        childElemIndex += isFragment ? childState.props.children.length : 1
        if (childElemIndex === path[i].index) break
      }
      childStateIndex++
    }
    let childState = null
    if (state.children[childStateIndex]) {
      childState = state.children[childStateIndex]
    } else {
      if (childStateIndex === 0) {
        childState = state.children
      } else {
        for (let i = 0; i <= 3; i++) {
          if (state.children[i].props) {
            childState = state.children[i]
            break
          }
        }
      }
    }
    state = childState?.props
    elem = path[i].child
  }
  return state
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
