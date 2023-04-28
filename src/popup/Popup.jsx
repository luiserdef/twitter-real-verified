import * as React from 'react'
import { validateBrowserAPI as browserAPI } from '../utils/validateUserBrowser'
import { CONFIG_REQUEST, DEFAULT_CONFIG } from '../constants'
import ChangeBadgeColor from './components/ChangeBadgeColor'
import InfoBadges from './components/InfoBadges'
import SaveButton from './components/SaveButton'
import Options from './components/Options'
import PopupHeader from './components/PopupHeader'
import Dropdown from './components/Dropdown'

function Popup () {
  const txt = (text) => browserAPI().i18n.getMessage(text)
  const [isThereChanges, setIsThereChanges] = React.useState(false)
  const [loadExtension, setLoadExtension] = React.useState(true)
  const [changeMade, setChangeMade] = React.useState({
    status: false,
    description: ''
  })

  const [userConfig, setUserConfig] = React.useState({
    badgeColor: DEFAULT_CONFIG.BADGE_COLOR,
    hideTwitterBlueBadge: DEFAULT_CONFIG.HIDE_TWITTER_BLUE_BADGE,
    revokeLegacyVerifiedBadge: DEFAULT_CONFIG.REVOKE_LEGACY_VERIFIED_BADGE
  })

  React.useEffect(() => {
    handleUserConfig(CONFIG_REQUEST.LOAD, true)
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
    handleUserConfig(CONFIG_REQUEST.SAVE, userConfig)
      .then((res) => {
        console.log(res)
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
          <PopupHeader
            txt={txt}
          />
          <InfoBadges
            txt={txt}
            userBadgeColor={userConfig.badgeColor}
          />
          <Dropdown title={txt('options')}>
            <Options
              txt={txt}
              hideTwitterBlueBadge={userConfig.hideTwitterBlueBadge}
              revokeLegacyVerifiedBadge={userConfig.revokeLegacyVerifiedBadge}
              updateConfig={updateConfig}
            />
          </Dropdown>
          <Dropdown title={txt('option_change_color')}>
            <ChangeBadgeColor
              hideTB={userConfig.hideTwitterBlueBadge}
              txt={txt}
              userBadgeColor={userConfig.badgeColor}
              updateConfig={updateConfig}
            />
          </Dropdown>
          <SaveButton txt={txt} isThereChanges={isThereChanges} saveChanges={saveChanges} />
          {changeMade && <p className='save-alert-message'>{changeMade.description}</p>}
          {/* eslint-disable react/jsx-indent */}
          </>}
    </div>
  )
}
export default Popup

function handleUserConfig (request, value) {
  console.log(value)
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
              reject(new Error('Request failed'))
            }
          })
        })
    } catch (e) {
      reject(new Error('Request failed'))
    }
  })
}
