import * as React from 'react'
import { validateBrowserAPI as browserAPI } from '../utils/validateUserBrowser'
import { getText as txt } from '../utils/getText'
import { CONFIG_REQUEST, DEFAULT_CONFIG } from '../constants'
import { retrieveData } from '../utils/retrieveNewData'
import PopupHeader from './components/PopupHeader'
import InfoBadges from './components/InfoBadges'
import Dropdown from './components/Dropdown'
import Options from './components/Options'
import ChangeBadgeColor from './components/ChangeBadgeColor'
import SaveButton from './components/SaveButton'

const ERRORMESSAGE = {
  SAVED_FAILED: txt('alert_saved_failed'),
  NOT_ON_TWITTER: txt('alert_stay_on_twitter')
}

function Popup () {
  const [userConfig, setUserConfig] = React.useState(DEFAULT_CONFIG)
  const [isThereChanges, setIsThereChanges] = React.useState(false)
  const [loadExtension, setLoadExtension] = React.useState(true)
  const [changeMade, setChangeMade] = React.useState({
    status: false,
    description: ''
  })

  React.useEffect(() => {
    handleUserConfig(CONFIG_REQUEST.LOAD, true)
      .then(res => {
        setLoadExtension(true)
        if (res.content != null) {
          setUserConfig(retrieveData(res.content))
        }
      }
      ).catch(() => {
        setLoadExtension(false)
      })
  }, [])

  function saveChanges () {
    handleUserConfig(CONFIG_REQUEST.SAVE, userConfig)
      .then((res) => {
        setChangeMade({
          status: true,
          description: txt('alert_config_saved')
        })
      }
      ).catch((error) => {
        setChangeMade({
          status: true,
          description: error.message
        })
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
        ? <h1 className='stay-on-twitter'>{ERRORMESSAGE.NOT_ON_TWITTER}</h1>
        : <>
          <PopupHeader
            txt={txt}
          />
          <InfoBadges
            badgeColors={userConfig.badgeColors}
            isTwitterBlueClown={userConfig.options.replaceTBWithClown}
          />
          <Dropdown title={txt('options')}>
            <Options
              userOptions={userConfig.options}
              updateConfig={updateConfig}
            />
          </Dropdown>
          <Dropdown title={txt('option_change_color')}>
            <ChangeBadgeColor
              hideTwitterBlue={userConfig.options.hideTwitterBlueBadge}
              badgeColors={userConfig.badgeColors}
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
  return new Promise((resolve, reject) => {
    try {
      browserAPI().tabs.query({ active: true, lastFocusedWindow: true })
        .then(([tab]) => {
          if (tab !== undefined) {
            browserAPI().tabs.sendMessage(tab.id, {
              [request]: value
            }, (response) => {
              if (!browserAPI().runtime.lastError) {
                resolve(response)
              } else {
                reject(new Error(ERRORMESSAGE.NOT_ON_TWITTER))
              }
            })
          } else {
            reject(new Error(ERRORMESSAGE.SAVED_FAILED))
          }
        })
    } catch (e) {
      reject(new Error(ERRORMESSAGE.NOT_ON_TWITTER))
    }
  })
}
