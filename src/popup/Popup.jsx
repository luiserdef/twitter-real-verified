import * as React from 'react'
import InfoBadges from './components/InfoBadges'
import { validateBrowserAPI as browserAPI } from '../utils/validateUserBrowser'
import { handleUserConfig } from './utils/handleUserConfig'
import ButtonSave from './components/ButtonSave'
import ChangeBadgeColor from './components/changeBadgeColor'

function Popup () {
  const defaultVerifyColor = '#1d9bf0'
  const txt = (text) => browserAPI().i18n.getMessage(text)
  const [isThereChanges, setIsThereChanges] = React.useState(false)
  const [loadExtension, setLoadExtension] = React.useState(true)
  const [changeMade, setChangeMade] = React.useState({
    status: false,
    description: ''
  })
  const [userConfig, setUserConfig] = React.useState({
    badgeColor: defaultVerifyColor
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
            defaultVerifyColor={defaultVerifyColor}
            userBadgeColor={userConfig.badgeColor}
          />
          <ChangeBadgeColor
            txt={txt}
            userBadgeColor={userConfig.badgeColor}
            defaultVerifyColor={defaultVerifyColor}
            updateConfig={updateConfig}
          />
          <ButtonSave txt={txt} isThereChanges={isThereChanges} saveChanges={saveChanges} />
          {changeMade && <p className='save-alert-message'>{changeMade.description}</p>}
          {/* eslint-disable react/jsx-indent */}
          </>}
    </div>
  )
}
export default Popup
