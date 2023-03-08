const LOCAL_STORAGE_NAME = "TRVerifiedConfig"
const localStorageConfig = localStorage.getItem(LOCAL_STORAGE_NAME)
const blueVerifiedBadgePath = 'M 22.25 12 c 0 -1.43 -0.88 -2.67 -2.19 -3.34 c 0.46 -1.39 0.2 -2.9 -0.81 -3.91 s -2.52 -1.27 -3.91 -0.81 c -0.66 -1.31 -1.91 -2.19 -3.34 -2.19 s -2.67 0.88 -3.33 2.19 c -1.4 -0.46 -2.91 -0.2 -3.92 0.81 s -1.26 2.52 -0.8 3.91 c -1.31 0.67 -2.2 1.91 -2.2 3.34 s 0.89 2.67 2.2 3.34 c -0.46 1.39 -0.21 2.9 0.8 3.91 s 2.52 1.26 3.91 0.81 c 0.67 1.31 1.91 2.19 3.34 2.19 s 2.68 -0.88 3.34 -2.19 c 1.39 0.45 2.9 0.2 3.91 -0.81 s 1.27 -2.52 0.81 -3.91 c 1.31 -0.67 2.19 -1.91 2.19 -3.34 z m -8.25 0 C 17 13 16 17 13 17 L 13 19 L 11 19 L 11 17 L 8 16 L 9 14 L 12 15 C 14 15 14 13 11 13 L 11 13 C 8 13 7 8 11 7 l 0 0 l 0 -2 L 13 5 L 13 7 C 15 7 15 8 16 9 l 0 0 L 14 10 C 14 9 12 8 11 9 C 9 11 12 11 14 12 z'
let blueVerifiedBadgeColor = '#1d9bf0'

if(localStorageConfig){
    let actualConfig = JSON.parse(localStorageConfig)
    blueVerifiedBadgeColor = actualConfig.badgeColor
}

//**Target badges**
const checkAtTopProfile ='css-901oao css-16my406 r-xoduu5 r-18u37iz r-1q142lx r-poiln3 r-bcqeeo r-qvutc0'                         
const checkAtNameProfile= 'css-901oao css-16my406 r-xoduu5 r-18u37iz r-1q142lx r-poiln3 r-adyw6z r-135wba7 r-bcqeeo r-qvutc0'
//DarkMode => DM
const checkAtTimelineDM ='css-901oao r-1nao33i r-xoduu5 r-18u37iz r-1q142lx r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0'
const hoveredUserDM = 'css-901oao r-1nao33i r-xoduu5 r-18u37iz r-1q142lx r-37j5jr r-1inkyih r-16dba41 r-rjixqe r-bcqeeo r-qvutc0'
const checkAtNotificationDM = 'css-4rbku5 css-18t94o4 css-901oao css-16my406 r-1nao33i r-1loqt21 r-poiln3 r-b88u0q r-bcqeeo r-qvutc0'
const notificationHoveredProfileDM = 'css-901oao css-16my406 r-1nao33i r-xoduu5 r-18u37iz r-1q142lx r-37j5jr r-1inkyih r-16dba41 r-rjixqe r-bcqeeo r-qvutc0'
//LightMode => LM
const checkAtTimelineLM ='css-901oao r-18jsvk2 r-xoduu5 r-18u37iz r-1q142lx r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0'
const hoveredUserLM ='css-901oao r-18jsvk2 r-xoduu5 r-18u37iz r-1q142lx r-37j5jr r-1inkyih r-16dba41 r-rjixqe r-bcqeeo r-qvutc0'
const checkAtNotificationLM = 'css-4rbku5 css-18t94o4 css-901oao css-16my406 r-18jsvk2 r-1loqt21 r-poiln3 r-b88u0q r-bcqeeo r-qvutc0' 
const notificationHoveredProfileLM = 'css-901oao css-16my406 r-18jsvk2 r-xoduu5 r-18u37iz r-1q142lx r-37j5jr r-1inkyih r-16dba41 r-rjixqe r-bcqeeo r-qvutc0'
//DimMode => DMM
const checkAtTimelineDMM = 'css-901oao r-vlxjld r-xoduu5 r-18u37iz r-1q142lx r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0'
const hoveredUserDimMode='css-901oao r-vlxjld r-xoduu5 r-18u37iz r-1q142lx r-37j5jr r-1inkyih r-16dba41 r-rjixqe r-bcqeeo r-qvutc0'
const checkAtNotificationDMM = 'css-4rbku5 css-18t94o4 css-901oao css-16my406 r-vlxjld r-1loqt21 r-poiln3 r-b88u0q r-bcqeeo r-qvutc0' 
const notificationHoveredProfileDMM = 'css-901oao css-16my406 r-vlxjld r-xoduu5 r-18u37iz r-1q142lx r-37j5jr r-1inkyih r-16dba41 r-rjixqe r-bcqeeo r-qvutc0'

const badgesTargets = [
    checkAtTopProfile,
    checkAtNameProfile,
    checkAtNotificationDM,
    checkAtNotificationLM,
    checkAtNotificationDMM,
    notificationHoveredProfileDM,
    notificationHoveredProfileLM,
    notificationHoveredProfileDMM,
    checkAtTimelineDM,
    checkAtTimelineLM,
    checkAtTimelineDMM,
    hoveredUserDimMode,
    hoveredUserLM,
    hoveredUserDM
]

//find elements that target badges (elements)
function findElement (element) {
    if(badgesTargets.includes(element.className)){
        if(element.className === checkAtNotificationDM ||
           element.className === checkAtNotificationLM ||
           element.className === checkAtNotificationDMM){
            //1 is for sending position to find correct props
            userVerifyStatus(element,1)
        }else{
            userVerifyStatus(element)
        }
    }

    if (element.childNodes) {
        [...element.childNodes].forEach(findElement);
    }
};

function changeBadge (element){
    if(element.tagName == 'path'){
        element.setAttribute('d', blueVerifiedBadgePath)
        element.style.fill = blueVerifiedBadgeColor
    }
    
    //find svg element
    if (element.childNodes) {
        [...element.childNodes].forEach(changeBadge);
    }
}

function userVerifyStatus(element,especialPosition){
    const elementPropsNames = Object.getOwnPropertyNames(element);
    const reactProps = elementPropsNames.find( nameProp => nameProp.startsWith("__reactProps"));
    const positionValue = especialPosition || 0
    const mainProps = element[reactProps];
    
    const isBlueVerified = mainProps.children.props.children[0][positionValue].props.isBlueVerified
    const isVerified = mainProps.children.props.children[0][positionValue].props.isVerified
    
    if(!isVerified){
        if(isBlueVerified){
            changeBadge(element) 
        }
    }
}

const observer = new MutationObserver(callbackObserver);

function callbackObserver(mutationList){
    for (const mutation of mutationList) {        
        for(node of mutation.addedNodes){
            findElement(node)
        }
    }
}

observer.observe(document,{
    childList:true,
    subtree:true
})


