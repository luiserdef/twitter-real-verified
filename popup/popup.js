const colorPicker = document.getElementById("color-picker")
const blueBadgePopup = document.getElementById("blue-badge-popup")
const badgePickColor = document.querySelectorAll(".badge-pick-color")
const btSaveAction = document.querySelector(".bt-save-action")
const infoSaveText = document.getElementById("info-save")

const LOCAL_STORAGE_NAME = "TVerifiedConfig"
const localStorageConfig = localStorage.getItem(LOCAL_STORAGE_NAME)
let blueVerifiedBadgeColor = '#3297c579'

if(!localStorageConfig){
    localStorageValues={
        badgeColor:blueVerifiedBadgeColor
    }
    localStorage.setItem(LOCAL_STORAGE_NAME,JSON.stringify(localStorageValues))
}else{
    let configValues= JSON.parse(localStorageConfig)
    blueBadgePopup.style.fill=configValues.badgeColor
    blueVerifiedBadgeColor = configValues.badgeColor
}

//Change badge color options
badgePickColor.forEach(element => {
    element.style.fill= blueVerifiedBadgeColor
});

colorPicker.addEventListener("input",(e)=>{
    badgePickColor.forEach(element => {
        element.style.fill= e.target.value
    });
    activateChangeOptions()
    blueVerifiedBadgeColor = e.target.value
})

btSaveAction.addEventListener("click",()=>{ 
    infoSaveText.style.display="block"
    saveChanges("badgeColor",blueVerifiedBadgeColor)
})

function activateChangeOptions(){
    btSaveAction.removeAttribute("disabled")
    btSaveAction.classList.add("bt-save")
}


function saveChanges(configKey,configValue){
    let configValues= JSON.parse(localStorageConfig)
    let newValues = {
        ...configValues,
        [configKey]:configValue
    }
    let configObjectToString = JSON.stringify(newValues)

    localStorage.setItem(LOCAL_STORAGE_NAME, configObjectToString)
    sendConfig(configObjectToString)
}

async function sendConfig(configObjectToString) {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {config: configObjectToString});
}

