import * as React from 'react'
import icon48 from '../../assets/icon48.png'
import Github from '../assets/github.svg'
import { CURRENT_VERSION } from '../../constants'

function PopupHeader ({ txt }) {
  return (
    <div className='header'>
      <div className='title'>
        <img src={icon48} alt='' />
        <h1 className='txt-title-popup'>{txt('app_title')}</h1>
      </div>
      <div className='info'>
        <span className='ext-version'>v{CURRENT_VERSION}</span>
        <a className='visit-github' href='https://github.com/luiserdef/twitter-real-verified' target='_blank' rel='noreferrer'>
          <span>GitHub</span>
          <Github width='15' height='15' />
        </a>
      </div>
    </div>
  )
}

export default PopupHeader
