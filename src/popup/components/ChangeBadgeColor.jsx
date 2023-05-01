import * as React from 'react'
import { getText as txt } from '../../utils/getText'
import VerifiedBadge from '../assets/verifiedBadge.svg'
import TwitterBlueBadge from '../assets/twitterBlueBadge.svg'
import ColorPicker from './ColorPicker'
import BadgeColorSelection from './BadgeColorSelection'

function ChangeBadgeColor ({
  badgeColors,
  updateConfig
}) {
  const selectBadge = {
    verified: false,
    verifiedAndWithTwitterBlue: false,
    twitterBlue: false
  }
  const [isBadgeSelected, setIsBadgeSelected] = React.useState({ ...selectBadge, verified: true })

  function updateSelection (key) {
    setIsBadgeSelected({ ...selectBadge, [key]: true })
  }

  function badgeSelection () {
    for (const property in isBadgeSelected) {
      if (isBadgeSelected[property] === true) {
        return property
      }
    }
  }

  function updateCurrentColor (key, value) {
    const currentBadgeColors = { ...badgeColors, [key]: value }
    updateConfig('badgeColors', currentBadgeColors)
  }

  return (
    <section className='column-center' style={{ gap: '.5em', paddingTop: 0 }}>
      <div className='row-center' style={{ gap: '.5em', alignItems: 'flex-start' }}>
        <BadgeColorSelection
          updateSelection={() => updateSelection('verified')}
          title={txt('verified')}
          Badge={VerifiedBadge}
          currentUserColor={badgeColors.verified}
          isBadgeSelected={isBadgeSelected.verified}
        />
        <BadgeColorSelection
          updateSelection={() => updateSelection('verifiedAndWithTwitterBlue')}
          title={txt('verified_and_with_twitter_blue')}
          Badge={VerifiedBadge}
          currentUserColor={badgeColors.verifiedAndWithTwitterBlue}
          isBadgeSelected={isBadgeSelected.verifiedAndWithTwitterBlue}
        />
        <BadgeColorSelection
          updateSelection={() => updateSelection('twitterBlue')}
          title={txt('twitter_blue')}
          Badge={TwitterBlueBadge}
          currentUserColor={badgeColors.twitterBlue}
          isBadgeSelected={isBadgeSelected.twitterBlue}
        />
      </div>
      <ColorPicker
        propertyKey={badgeSelection()}
        currentUserColor={badgeColors[badgeSelection()]}
        updateCurrentColor={updateCurrentColor}
      />
    </section>
  )
}

export default ChangeBadgeColor
