// https://stackoverflow.com/a/74240138/2230249
export function getMainReactProps (parent, target) {
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
