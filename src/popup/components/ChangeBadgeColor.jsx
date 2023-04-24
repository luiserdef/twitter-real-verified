import * as React from 'react'
import TwitterBlueBadge from '../assets/twitterBlueBadge.svg'

function ChangeBadgeColor ({ hideTB, txt, userBadgeColor, updateConfig, defaultVerifyColor }) {
  const colorPickerRef = React.useRef(null)

  React.useEffect(() => {
    colorPickerRef.current.addEventListener('input', (e) => {
      updateConfig('badgeColor', e.target.value)
    })
  }, [])

  function resetColorToDefault () {
    updateConfig('badgeColor', defaultVerifyColor)
  }
  const displaySection = hideTB ? { display: 'none' } : { display: 'flex' }

  return (
    <section style={displaySection}>
      <h3 className='title_popup secondary-title'>{txt('option_change_color')}</h3>
      <div className='change-badge-container'>
        <div id='pick-color-box'>
          {/* eslint-disable quotes */}
          <input style={{ background: userBadgeColor }} ref={colorPickerRef} className='color-picker' data-jscolor={`{"width": 80, "position":"top", "value":"#1D9BF0"}`} />
        </div>
        <div className='badge-color-container'>
          <div className='bg-badge'>
            <TwitterBlueBadge width='30px' heigth='30px' fill={userBadgeColor} />
          </div>
          <div className='bg-badge'>
            <TwitterBlueBadge width='30px' heigth='30px' fill={userBadgeColor} />
          </div>
        </div>
      </div>
      <p onClick={resetColorToDefault} className='reset-default'>{txt('option_change_color_reset_default')} </p>
    </section>
  )
}

export default ChangeBadgeColor
