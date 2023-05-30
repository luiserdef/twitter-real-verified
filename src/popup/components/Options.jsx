import * as React from 'react'
import { getText as txt } from '../../utils/getText'
import CheckboxInput from './CheckboxInput'
import ClownBadge from '../assets/clownBadge.svg'

function Options ({ userOptions, updateConfig }) {
  function updateCurrentOption (key, value) {
    const currentBadgeColors = { ...userOptions, [key]: value }
    updateConfig('options', currentBadgeColors)
  }

  const replacewithClown = (
    <>
      {txt('replace_twitter_blue_badge_with_clown')}
      <ClownBadge />
    </>

  )

  return (
    <section>
      <div style={{ gap: '.5em' }} className='options-container'>
        <CheckboxInput
          propertyKey='hideTwitterBlueBadge'
          checkboxStatus={userOptions.hideTwitterBlueBadge}
          updateFunction={updateCurrentOption}
          text={txt('hide_twitter_blue')}
        />
        <div className='line-breakup' />
        <CheckboxInput
          propertyKey='revokeLegacyVerifiedBadge'
          checkboxStatus={userOptions.revokeLegacyVerifiedBadge}
          updateFunction={updateCurrentOption}
          text={txt('revoke_verified')}
        />
        <div className='line-breakup' />
        <CheckboxInput
          propertyKey='replaceTBWithClown'
          checkboxStatus={userOptions.replaceTBWithClown}
          updateFunction={updateCurrentOption}
          text={replacewithClown}
        />
        <div className='line-breakup' />
        <CheckboxInput
          propertyKey='simpleCheckmark'
          checkboxStatus={userOptions.simpleCheckmark}
          updateFunction={updateCurrentOption}
          text={txt('simple_checkmark')}
        />
      </div>
    </section>
  )
}

export default Options
