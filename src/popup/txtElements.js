let browserAPI = chrome
if (typeof browser !== 'undefined') {
  browserAPI = browser
}
const getText = (text) => browserAPI.i18n.getMessage(text)

const txtTitlePopup = document.getElementById('txt-title-popup')
const txtVerifiedBadge = document.getElementById('txt-verified-badge')
const txtBusinessBadge = document.getElementById('txt-bussiness-badge')
const txtGovernmentOrganizationBadge = document.getElementById('txt-goverment-organization-badge')
const txtTwitterBlueBadge = document.getElementById('txt-twitter-blue-badge')
const txtOptionChangeColor = document.getElementById('txt-option-change-color')
const txtOptionChangeColorResetDefault = document.getElementById('txt-option-change-color-reset-default')
const txtBtSave = document.getElementById('txt-bt-save')
const txtAlertRefreshPage = document.getElementById('txt-alert-refresh-page')

txtTitlePopup.textContent = getText('app_Title')
txtVerifiedBadge.textContent = getText('verified_badge')
txtBusinessBadge.textContent = getText('bussiness_badge')
txtGovernmentOrganizationBadge.textContent = getText('goverment_organization_badge')
txtTwitterBlueBadge.textContent = getText('twitter_blue_badge')
txtOptionChangeColor.textContent = getText('option_change_color')
txtOptionChangeColorResetDefault.textContent = getText('option_change_color_reset_default')
txtBtSave.textContent = getText('bt_save')
txtAlertRefreshPage.textContent = getText('alert_refresh_page')
