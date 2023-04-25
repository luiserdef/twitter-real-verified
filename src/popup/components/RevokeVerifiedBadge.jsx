import * as React from 'react'

function RevokeVerifiedBadge ({ txt, revokeLegacyVerifiedBadge, updateConfig }) {
  function updaterevokeVerified () {
    updateConfig('revokeLegacyVerifiedBadge', !revokeLegacyVerifiedBadge)
  }

  return (
    <section>
      <h3 className='title_popup secondary-title'>{txt('options')}</h3>
      <div className='option-container'>
        <input
          id='revoke-verified'
          className='hide-twitter-blue'
          onChange={updaterevokeVerified}
          checked={revokeLegacyVerifiedBadge}
          name='revoke-verified'
          type='checkbox'
        />
        <label for='revoke-verified'>
          {txt('revoke_verified')}
        </label>
      </div>
    </section>
  )
}

export default RevokeVerifiedBadge
