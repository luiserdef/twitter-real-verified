import * as React from 'react'
import { validateBrowserAPI as browserAPI } from '../utils/validateUserBrowser'
import { VERIFIED_BADGE_DEFAULT_COLOR } from '../constants/badge'
import ChangeBadgeColor from './components/ChangeBadgeColor'
import InfoBadges from './components/InfoBadges'
import SaveButton from './components/SaveButton'
import HideTwitterBlue from './components/HideTwitterBlue'
import RevokeVerifiedBadge from './components/RevokeVerifiedBadge'

function Popup () {
  const txt = (text) => browserAPI().i18n.getMessage(text)
  const [isThereChanges, setIsThereChanges] = React.useState(false)
  const [loadExtension, setLoadExtension] = React.useState(true)
  const [changeMade, setChangeMade] = React.useState({
    status: false,
    description: ''
  })
  const [userConfig, setUserConfig] = React.useState({
    badgeColor: VERIFIED_BADGE_DEFAULT_COLOR,
    hideTwitterBlueBadge: false,
    revokeLegacyVerifiedBadge: false
  })

  React.useEffect(() => {
    handleUserConfig('getConfig', true)
      .then(res => {
        setLoadExtension(true)
        if (res.content != null) {
          setUserConfig(res.content)
        }
      }
      ).catch(() => {
        setLoadExtension(false)
      })
  }, [])

  function saveChanges () {
    handleUserConfig('saveConfig', userConfig)
      .then(() => {
        setChangeMade({
          status: true,
          description: txt('alert_refresh_page')
        })
      }
      ).catch(() => {
        setLoadExtension(false)
      })
  }

  function updateConfig (key, value) {
    setIsThereChanges(true)
    setUserConfig(lastValue => {
      return {
        ...lastValue, [key]: value
      }
    })
  }

  return (
    <div className='content'>
      {!loadExtension
        ? <h1 className='stay-on-twitter'>{txt('alert_stay_on_twitter')}</h1>
        : <>
          <h1 className='txt-title-popup'>{txt('app_title')}</h1>
          <InfoBadges
            txt={txt}
            defaultVerifyColor={VERIFIED_BADGE_DEFAULT_COLOR}
            userBadgeColor={userConfig.badgeColor}
          />
          <HideTwitterBlue
            txt={txt}
            hideTwitterBlueBadge={userConfig.hideTwitterBlueBadge}
            updateConfig={updateConfig}
          />
          <RevokeVerifiedBadge
            revokeLegacyVerifiedBadge={userConfig.revokeLegacyVerifiedBadge}
            txt={txt}
            updateConfig={updateConfig}
          />
          <ChangeBadgeColor
            hideTB={userConfig.hideTwitterBlueBadge}
            txt={txt}
            userBadgeColor={userConfig.badgeColor}
            defaultVerifyColor={VERIFIED_BADGE_DEFAULT_COLOR}
            updateConfig={updateConfig}
          />
          <SaveButton txt={txt} isThereChanges={isThereChanges} saveChanges={saveChanges} />
          {changeMade && <p className='save-alert-message'>{changeMade.description}</p>}
          {/* eslint-disable react/jsx-indent */}
          </>}
    </div>
  )
}
export default Popup

function handleUserConfig (request, value) {
  return new Promise((resolve, reject) => {
    try {
      browserAPI().tabs.query({ active: true, lastFocusedWindow: true })
        .then(([tab]) => {
          browserAPI().tabs.sendMessage(tab.id, {
            [request]: value
          }, (response) => {
            if (!browserAPI().runtime.lastError) {
              resolve(response)
            } else {
              reject(new Error('request failed'))
            }
          })
        })
    } catch (e) {
      reject(new Error('request failed'))
    }
  })
}
