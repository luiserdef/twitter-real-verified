
export const elementsPaths = (element) => {
  return [
    // Account menu user profile, inbox Messages , heading title (user profile), search results, you might like section
    element?.parentElement?.parentElement?.parentElement || undefined,
    // Tweets, quote Tweet, who to follow section
    element?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement || undefined,
    // username below profile photo (User profile)
    element?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.nextElementSibling?.firstChild || undefined,
    // Twitter space lobby
    element?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.previousSibling || undefined,
    // Twitter space preview
    element?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement || undefined,
    // Followed you notification
    element?.parentElement?.parentElement?.parentElement?.parentElement?.previousSibling || undefined
  ]
}

// Possible paths where screenName can be found
export const propsPaths = (element) => {
  try {
    const path =
        element?.children[0]?.props?.screenName ??
        element?.children[0]?.props?.children[2]?._owner?.memoizedProps?.screenName ??
        element?.children?.props?.screenName ??
        element?.children[0]?.props?.children?.props?.screenName ??
        element?.children[1]?.props?.host?.twitter_screen_name ??
        element?.children?.props?.users[0]?.screen_name ?? undefined
    return path
  } catch (e) {
    return undefined
  }
}
