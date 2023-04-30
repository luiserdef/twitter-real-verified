import { validateBrowserAPI as browserAPI } from './validateUserBrowser'
export const getText = (text) => browserAPI().i18n?.getMessage(text)
