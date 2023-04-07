import * as React from 'react'
import VerifiedBadge from '../assets/verifiedBadge.svg'
import GovermentBadge from '../assets/govermentBadge.svg'
import BusinessBadge from '../assets/businessBadge.svg'
import TwitterBlueBadge from '../assets/twitterBlueBadge.svg'

function InfoBadges ({ txt, userBadgeColor, defaultVerifyColor }) {
  const [twitterBluelastUserBadgeColor, setTwitterBluelastUserBadgeColor] = React.useState(userBadgeColor)
  const [renderCount, setRenderCount] = React.useState(1)

  React.useEffect(() => {
    if (userBadgeColor !== defaultVerifyColor && renderCount <= 1) {
      setRenderCount(last => last + 1)
      setTwitterBluelastUserBadgeColor(userBadgeColor)
    }
  }, [userBadgeColor])

  return (
    <div className='info-badge'>
      <div>
        <ul>
          <li className='verified-list'>
            <VerifiedBadge />
            <p>{txt('verified_badge')}</p>
          </li>
          <li className='verified-list'>
            <BusinessBadge />
            <p>{txt('bussiness_badge')}</p>
          </li>
          <li className='verified-list'>
            <GovermentBadge />
            <p>{txt('goverment_organization_badge')}</p>
          </li>
        </ul>
      </div>
      <div className='info-element'>
        <TwitterBlueBadge fill={twitterBluelastUserBadgeColor} />
        <p>{txt('twitter_blue_badge')}</p>
      </div>
    </div>
  )
}
export default InfoBadges
