
const checkboxRemoveBadges = document.getElementById('check_remove_badges')

checkboxRemoveBadges.addEventListener('click',(e)=>{
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,{
            checkRemoveBadges:checkboxRemoveBadges.checked
        })
    })
})