import * as React from 'react'
import icon48 from '../../assets/icon48.png'
import Github from '../assets/github.svg'

function PopupHeader ({ txt }) {
  return (
    <div className='header'>
      <div className='title'>
        <img src={icon48} alt='' />
        <h1 className='txt-title-popup'>{txt('app_title')}</h1>
      </div>
      <div className='info'>
        <span className='ext-version'>V.2.1.0</span>
        <div className='visit-github'>
          <span>Github</span>
          <Github width='15' height='15' />
        </div>
      </div>
    </div>
  )
}

export default PopupHeader
