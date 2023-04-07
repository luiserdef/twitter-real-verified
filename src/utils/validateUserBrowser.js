// This validates which browser the user is using the extension in
// and then be used to invoke the corresponding API for the browser and utilize functions such as sendMessage or tabs.query.
export const validateBrowserAPI = () => {
  if (typeof browser !== 'undefined') {
    return browser
  }
  return chrome
}
