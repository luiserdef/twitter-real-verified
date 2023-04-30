import * as React from 'react'
import { getText as txt } from '../../utils/getText'
import VerifiedBadge from '../assets/verifiedBadge.svg'
import GovermentBadge from '../assets/govermentBadge.svg'
import BusinessBadge from '../assets/businessBadge.svg'
import TwitterBlueBadge from '../assets/twitterBlueBadge.svg'
import ClownBadge from '../assets/clownBadge.svg'

function InfoBadges ({ badgeColors, isTwitterBlueClown }) {
  return (
    <div className='info-badge'>
      <ul>
        <li className='verified-list'>
          <VerifiedBadge fill={badgeColors.verifiedAndWithTwitterBlue} />
          <p>{txt('verified_and_with_twitter_blue')}</p>
        </li>
      </ul>
      <ul>
        <li className='verified-list'>
          <VerifiedBadge fill={badgeColors.verified} />
          <p>{txt('verified')}</p>
        </li>
        <li className='verified-list'>
          {!isTwitterBlueClown ? <TwitterBlueBadge fill={badgeColors.twitterBlue} /> : <ClownBadge />}
          <p>{txt('twitter_blue_badge')}</p>
        </li>
      </ul>
      <ul>
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
  )
}
export default InfoBadges
