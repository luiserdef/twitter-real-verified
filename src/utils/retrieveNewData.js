import { DEFAULT_CONFIG } from '../constants'
// This will change the old way that the data has been saved to a new one
// It will return a new object structure.
export function retrieveData (data) {
  if (data?.options) {
    return data
  } else {
    return { ...DEFAULT_CONFIG, badgeColors: { ...DEFAULT_CONFIG.badgeColors, twitterBlue: data.badgeColor } }
  }
}
