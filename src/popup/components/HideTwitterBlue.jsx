import * as React from 'react'

function HideTwitterBlue ({ txt, hideTwitterBlueBadge, updateConfig }) {
  function updatehideTwitterBlue () {
    updateConfig('hideTwitterBlueBadge', !hideTwitterBlueBadge)
  }

  return (
    <section>
      <h3 className='title_popup secondary-title'>{txt('options')}</h3>
      <div className='option-container'>
        <input
          id='hide-twitter-blue'
          className='hide-twitter-blue'
          onChange={updatehideTwitterBlue}
          checked={hideTwitterBlueBadge}
          name='hide-twitter-blue'
          type='checkbox'
        />
        <label for='hide-twitter-blue'>
          {txt('hide_twitter_blue')}
        </label>
      </div>
    </section>
  )
}

export default HideTwitterBlue
