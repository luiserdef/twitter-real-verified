import { legacyVerifiedUsers } from './legacyVerifiedUsers'
import { findUserName } from './utils/findUserName'
import { elementsPaths, propsPaths } from './utils/elementPathsUserName'
import { LOCAL_STORAGE } from './constants/localStorage'
import {
  BADGE_CLASS_TARGET,
  BLUE_VERIFIED_BADGE,
  VERIFIED_BADGE,
  VERIFIED_BADGE_DEFAULT_COLOR
} from './constants/badge'

let blueVerifiedBadgeColor = VERIFIED_BADGE_DEFAULT_COLOR

const localStorageConfig = localStorage.getItem(LOCAL_STORAGE)
if (localStorageConfig) {
  const actualConfig = JSON.parse(localStorageConfig)
  blueVerifiedBadgeColor = actualConfig.badgeColor
}

function findElementBadge (element) {
  if (BADGE_CLASS_TARGET === element.className) {
    const elementProps = getMainReactProps(element.parentNode.parentNode.parentNode, element)
    const profileBadgeHeading = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    if (elementProps !== undefined && profileBadgeHeading.role !== 'heading') {
      handleVerificationStatus(elementProps, element)
    }
  } else {
    // Checks for changes when switching between user profiles
    // Changes in description act like a trigger
    if (element.dataset?.testid === 'UserDescription') {
      const badgeElements = document.querySelectorAll(`.${BADGE_CLASS_TARGET.replaceAll(' ', '.')}`)
      for (let i = 0; i < badgeElements.length; i++) {
        const profileHeadingPath = badgeElements[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        if (profileHeadingPath.role === 'heading') {
          // Heading
          const elementProps = getMainReactProps(badgeElements[i].parentNode.parentNode.parentNode, badgeElements[i])
          handleVerificationStatus(elementProps, badgeElements[i], true)
          // At user name, below profile photo
          const elementProps2 = getMainReactProps(badgeElements[i + 1].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, badgeElements[i + 1])
          handleVerificationStatus(elementProps2, badgeElements[i + 1], true)
          break
        }
      }
    }
  }

  if (element.childNodes) {
    [...element.childNodes].forEach(findElementBadge)
  }
}

function handleVerificationStatus (elementProps, element, isAtProfile) {
  if (isAtProfile && element.firstChild?.tagName === 'svg') {
    if (element.firstChild.ariaLabel === 'Legacy Verified') {
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
      createBadge(element, 'blueVerified', verifiedType)
    }
  } else {
    if (isUserVerified) createBadge(element, 'verified', verifiedType)
  }
}

function isUserLegacyVerified (element) {
  const elementPaths = elementsPaths(element)

  for (let i = 0; i < elementPaths.length; i++) {
    const elementProps = elementPaths[i] && getReactProps(elementPaths[i])
    const actualUser = propsPaths(elementProps)
    if (elementProps !== undefined && actualUser !== undefined) {
      for (let index = 0; index < legacyVerifiedUsers.length; index++) {
        if (legacyVerifiedUsers[index].key === actualUser[0]) {
          if (findUserName(legacyVerifiedUsers[index].users, actualUser) !== -1) {
            return true
          } else {
            return false
          }
        }
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

function createBadge (element, userVerifyStatus, verifiedType) {
  let svgElementG = element
  while (svgElementG !== null && svgElementG.tagName !== 'g') {
    svgElementG = svgElementG.firstChild
  }

  if (svgElementG !== null && (verifiedType === 'Business' || verifiedType === 'Government')) return

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
    svgElement.setAttribute('viewBox', '0 0 22 22')
    svgElement.setAttribute('aria-label', 'Legacy Verified')
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

/* eslint-disable no-undef */
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
