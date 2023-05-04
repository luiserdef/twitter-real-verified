
function getParentElementByLevel (element, parentLevel) {
  let parentTarget = element
  let level = 0
  while (level < parentLevel) {
    parentTarget = parentTarget?.parentElement
    level++
  }
  return parentTarget
}

export const elementsPathsID = (element) => {
  return [
    // Tweets, quoted tweets, notifications (reply)
    getParentElementByLevel(element, 2) || undefined,
    // You might like section, inbox (user profile in body message),Twitter space preview in timeline, account selection
    getParentElementByLevel(element, 7) || undefined,
    // search box, bottom left (current user account)
    getParentElementByLevel(element, 6) || undefined,
    // Notifications (liked your reply, followed you)
    getParentElementByLevel(element, 3) || undefined,
    // Inbox (title, homepage), Twitter space loby before enter
    getParentElementByLevel(element, 8) || undefined,
    // Account hover, check lobby in twitter space
    getParentElementByLevel(element, 6)?.previousSibling || undefined,
    // Inbox (title, in expanded view)
    getParentElementByLevel(element, 10)?.previousSibling?.firstChild?.lastChild?.firstChild || undefined,
    // Inbox (message list)
    getParentElementByLevel(element, 11)?.previousSibling?.firstChild?.lastChild?.firstChild || undefined,
    // Heading | User Profile
    getParentElementByLevel(element, 6)?.nextSibling || undefined,
    // Second Badge | User Profile
    getParentElementByLevel(element, 6)?.nextSibling || undefined,
    // From 'username' (when a user uses media from another account in a tweet)
    getParentElementByLevel(element, 12) || undefined
    // Twitter space preview in timeline
    // getParentElementByLevel(element, 8)?.lastChild || undefined

  ]
}

function evaluateID (userID) {
  if (userID === undefined) return userID

  // periscopeUserId is a flag to determine is the user is in Twitter Space
  // This will start to check by screenName instead of userId
  /* eslint-disable no-prototype-builtins */
  if (userID.hasOwnProperty('periscopeUserId')) return -1

  if (Number(userID)) {
    return userID
  } else {
    return undefined
  }
}

function getIdForInboxTitle (conversationProps) {
  if (conversationProps?.perspective === undefined) return undefined
  const actualUser = conversationProps.perspective
  // A especial case to retrive the ID of the reciever in inbox messages
  // conversation_id return something like: "000-111" --> "userID-RecieverID"
  // or the other way around "111-000" --> "RecieverID-userID"
  const usersID = conversationProps.conversation.conversation_id.split('-')
  if (actualUser !== usersID[0]) {
    return usersID[0]
  } else {
    return usersID[1]
  }
}

export const propsPathsID = (element) => {
  try {
    const path =
          // Twitter space preview in timeline
          // evaluateID(element?.children?.props?.space?.host?.user_id) ??
          // check lobby in twitter space
          evaluateID(element?.children[1]?.props) ??
          evaluateID(element?.children[1]?.props?.host?.user_id) ??
          // Tweets, quoted tweets, notifications (reply)
          evaluateID(element?.children[1]?.props?.children?._owner?.memoizedProps?.userData?.userId) ??
          // You might like, Twitter space loby before enter
          evaluateID(element?.children[1]?.props?.userId) ??
          // Account selection
          evaluateID(element?.children[0]?._owner?.memoizedProps?.userId) ??
          // Search box
          evaluateID(element?.children[1]?._owner?.memoizedProps?.id) ??
          // Notifications (liked your reply, followed you)
          evaluateID(element?.children[0]?._owner?.memoizedProps?.entityId) ??
          // Bottom left (current user account)
          evaluateID(element?.children[0]?._owner?.memoizedProps?.currentUser?.id_str) ??
          // Inbox (title, inbox user information title)
          evaluateID(getIdForInboxTitle(element?.children?.props)) ??
          // Inbox (title | in expanded view)
          evaluateID(getIdForInboxTitle(element?.children?.props?.children?.key)) ??
          // Inbox (title | homepage)
          evaluateID(getIdForInboxTitle(element?.children[0]?.key)) ??
          // Inbox (messages list)
          evaluateID(element?.children[0]?.key) ??
          // Inbox (user profile in body message)
          evaluateID(element?.children[0]?.[4]?.props?.userId) ??
          // Second Badge | User Profile
          evaluateID(element?.children[0]?._owner?.sibling?.memoizedProps?.user?.id_str) ??
          // From 'username' (when a user uses media from another account in a tweet)
          evaluateID(element?.children[0]?.props?.children[0]?.props?.mediaDetails[0]?.additional_media_info?.source_user?.id_str) ??
          // Heading | User Profile
          evaluateID(element?.children?.props?.children[0]?.[0]?._owner?.memoizedProps?.user?.id_str) ??
          undefined

    return path
  } catch (e) {
    return undefined
  }
}
