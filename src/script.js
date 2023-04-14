let blueVerifiedBadgeColor = '#1d9bf0'

const LOCAL_STORAGE_NAME = 'TRVerifiedConfig'
const localStorageConfig = localStorage.getItem(LOCAL_STORAGE_NAME)
if (localStorageConfig) {
  const actualConfig = JSON.parse(localStorageConfig)
  blueVerifiedBadgeColor = actualConfig.badgeColor
}

const badgeClass = ['css-901oao css-16my406 r-1awozwy r-xoduu5 r-poiln3 r-bcqeeo r-qvutc0']

function findElementBadge (element) {
  if (badgeClass.includes(element.className)) {
    try {
      const elementProps = getMainReactProps(element.parentNode.parentNode.parentNode, element)
      // profileBadgeHeading check if it's in any user's profile
      const profileBadgeHeading = element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
      if (elementProps !== undefined && profileBadgeHeading.role !== 'heading') {
        handleVerificationStatus(elementProps, element)
      }
    } catch (e) {}
  } else {
    // profileDescriptionClass helps to check changes in a user Profile
    const profileDescriptionClass = [
      'css-901oao r-1nao33i r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0',
      'css-901oao r-18jsvk2 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0',
      'css-901oao r-vlxjld r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0']

    if (profileDescriptionClass.includes(element.className) && element.dataset.testid !== undefined) {
      const badgeElements = document.querySelectorAll('.css-901oao.css-16my406.r-1awozwy.r-xoduu5.r-poiln3.r-bcqeeo.r-qvutc0')

      for (let i = 0; i < badgeElements.length; i++) {
        const path = badgeElements[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
        if (path.role === 'heading') {
          // change the first badge of a profile user
          const elementProps = getMainReactProps(badgeElements[i].parentNode.parentNode.parentNode, badgeElements[i])
          handleVerificationStatus(elementProps, badgeElements[i])
          // change the second badge of a profile user
          const elementProps2 = getMainReactProps(badgeElements[i + 1].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, badgeElements[i + 1])
          handleVerificationStatus(elementProps2, badgeElements[i + 1])
          break
        }
      }
    }
  }

  if (element.childNodes) {
    [...element.childNodes].forEach(findElementBadge)
  }
}

function handleVerificationStatus (elementProps, element) {
  const isBlueVerified = elementProps.isBlueVerified
  const isVerified = elementProps.isVerified
  // console.log('is blue?: ' + elementProps.isBlueVerified)
  // console.log('is Verified?: ' + elementProps.isVerified)
  if (!isVerified) {
    if (isBlueVerified) {
      createBadge(element, 'blueVerified')
    } else {
      createBadge(element, 'notVerified')
    }
  } else {
    createBadge(element, 'verified')
  }
}

function createBadge (element, userVerifyStatus) {
  if (userVerifyStatus === 'notVerified') {
    console.log('entro al nada')
    let isIconExist = element
    while (isIconExist !== null && isIconExist.tagName !== 'g') {
      isIconExist = isIconExist.firstChild
    }
    console.log(isIconExist)
  } else {
    let BadgeColor = blueVerifiedBadgeColor
    let UserVerificationBadge = 'M 22.25 12 c 0 -1.43 -0.88 -2.67 -2.19 -3.34 c 0.46 -1.39 0.2 -2.9 -0.81 -3.91 s -2.52 -1.27 -3.91 -0.81 c -0.66 -1.31 -1.91 -2.19 -3.34 -2.19 s -2.67 0.88 -3.33 2.19 c -1.4 -0.46 -2.91 -0.2 -3.92 0.81 s -1.26 2.52 -0.8 3.91 c -1.31 0.67 -2.2 1.91 -2.2 3.34 s 0.89 2.67 2.2 3.34 c -0.46 1.39 -0.21 2.9 0.8 3.91 s 2.52 1.26 3.91 0.81 c 0.67 1.31 1.91 2.19 3.34 2.19 s 2.68 -0.88 3.34 -2.19 c 1.39 0.45 2.9 0.2 3.91 -0.81 s 1.27 -2.52 0.81 -3.91 c 1.31 -0.67 2.19 -1.91 2.19 -3.34 z m -8.25 0 C 17 13 16 17 13 17 L 13 19 L 11 19 L 11 17 L 8 16 L 9 14 L 12 15 C 14 15 14 13 11 13 L 11 13 C 8 13 7 8 11 7 l 0 0 l 0 -2 L 13 5 L 13 7 C 15 7 15 8 16 9 l 0 0 L 14 10 C 14 9 12 8 11 9 C 9 11 12 11 14 12 z'
    if (userVerifyStatus === 'verified') {
      // veridfied badge
      UserVerificationBadge = 'M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z'
      BadgeColor = '#1d9bf0'
    }

    let svgElementG = element
    while (svgElementG !== null && svgElementG.tagName !== 'g') {
      svgElementG = svgElementG.firstChild
    }

    if (svgElementG !== null) {
      const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      pathElement.setAttribute('fill', BadgeColor)
      pathElement.setAttribute('d', UserVerificationBadge)
      gElement.appendChild(pathElement)

      const parentElement = svgElementG.parentElement
      parentElement.removeChild(svgElementG)
      parentElement.appendChild(gElement)
    } else {
      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svgElement.setAttribute('viewBox', '0 0 22 22')
      svgElement.setAttribute('aria-label', 'Verified account')
      svgElement.setAttribute('class', 'r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr')

      const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      pathElement.setAttribute('fill', BadgeColor)
      pathElement.setAttribute('d', UserVerificationBadge)

      svgElement.appendChild(gElement)
      element.appendChild(svgElement)
    }
  }
}

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
  // console.log(path)
  // Walk down the path to find the react state props
  let state = elem[keyOfReactProps]
  // console.log(state)
  for (let i = path.length - 1; i >= 0 && state != null; i--) {
    // console.log('path: ' + i)
    // Find the target child state index
    let childStateIndex = 0; let childElemIndex = 0
    while (childStateIndex < state.children.length) {
      const childState = state.children[childStateIndex]
      if (childState instanceof Object) {
        // console.log('whiles')
        // Fragment children are inlined in the parent DOM element
        const isFragment = childState.type === symofReactFragment && childState.props.children.length
        childElemIndex += isFragment ? childState.props.children.length : 1
        if (childElemIndex === path[i].index) break
      }
      childStateIndex++
    }
    // console.log('estate al final')
    // console.log('state del childindex: ' + childStateIndex)
    // console.log(state)

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

    // const childState = state.children[childStateIndex] ?? (childStateIndex === 0 ? state.children : null)
    // console.log('state despues de validacion')
    // console.log(childState)
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
