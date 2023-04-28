import * as React from 'react'

function Options ({ txt, hideTwitterBlueBadge, revokeLegacyVerifiedBadge, updateConfig }) {
  function updatehideTwitterBlue () {
    updateConfig('hideTwitterBlueBadge', !hideTwitterBlueBadge)
  }

  function updaterevokeVerified () {
    updateConfig('revokeLegacyVerifiedBadge', !revokeLegacyVerifiedBadge)
  }

  return (
    <section>
      <div className='options-container'>
        <div className='input-option'>
          <input
            id='hide-twitter-blue'
            className='checkbox-input'
            type='checkbox'
            onChange={updatehideTwitterBlue}
            checked={hideTwitterBlueBadge}
          />
          <label htmlFor='hide-twitter-blue'>
            {txt('hide_twitter_blue')}
          </label>
        </div>
        <div className='input-option'>
          <input
            id='revoke-verified'
            className='checkbox-input'
            type='checkbox'
            onChange={updaterevokeVerified}
            checked={revokeLegacyVerifiedBadge}
          />
          <label htmlFor='revoke-verified'>
            {txt('revoke_verified')}
          </label>
        </div>
      </div>
    </section>
  )
}

export default Options
