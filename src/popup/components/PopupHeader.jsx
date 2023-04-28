import * as React from 'react'
import icon48 from '../../assets/icon48.png'

function PopupHeader ({ txt }) {
  return (
    <div className='header'>
      <div className='title'>
        <img src={icon48} alt='' />
        <h1 className='txt-title-popup'>{txt('app_title')}</h1>
      </div>
      <span className='ext-version'>V.2.1.0</span>
    </div>
  )
}

export default PopupHeader
