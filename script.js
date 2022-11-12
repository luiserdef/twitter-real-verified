const blueVerifiedBadgePath = 'M 22.25 12 c 0 -1.43 -0.88 -2.67 -2.19 -3.34 c 0.46 -1.39 0.2 -2.9 -0.81 -3.91 s -2.52 -1.27 -3.91 -0.81 c -0.66 -1.31 -1.91 -2.19 -3.34 -2.19 s -2.67 0.88 -3.33 2.19 c -1.4 -0.46 -2.91 -0.2 -3.92 0.81 s -1.26 2.52 -0.8 3.91 c -1.31 0.67 -2.2 1.91 -2.2 3.34 s 0.89 2.67 2.2 3.34 c -0.46 1.39 -0.21 2.9 0.8 3.91 s 2.52 1.26 3.91 0.81 c 0.67 1.31 1.91 2.19 3.34 2.19 s 2.68 -0.88 3.34 -2.19 c 1.39 0.45 2.9 0.2 3.91 -0.81 s 1.27 -2.52 0.81 -3.91 c 1.31 -0.67 2.19 -1.91 2.19 -3.34 z m -14.25 3 L 6 11 l 2 -4 L 11 6 L 13 7 L 15 8 l 1 2 l 0 2 l 0 2 l -2 2 L 12 16 z'

const checkAtTopProfile ='css-901oao css-16my406 r-xoduu5 r-18u37iz r-1q142lx r-poiln3 r-bcqeeo r-qvutc0'                         
const checkAtNameProfile= 'css-901oao css-16my406 r-xoduu5 r-18u37iz r-1q142lx r-poiln3 r-adyw6z r-135wba7 r-bcqeeo r-qvutc0'
const checkAtTimeline ='css-901oao r-1nao33i r-xoduu5 r-18u37iz r-1q142lx r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0'

const badgesForFind = [checkAtTopProfile,checkAtNameProfile,checkAtTimeline]

function recursiveFindForElement (element) {
    if(badgesForFind.includes(element.className)){
        userVerifyStatus(element)
    }

    if (element.childNodes) {
        [...element.childNodes].forEach(recursiveFindForElement);
    }
  };

 function changeBadge (element){
      
    if(element.tagName=='svg'){
        element.style.fill = 'red'
    }

    if(element.tagName == 'path'){
        element.setAttribute('d', blueVerifiedBadgePath)
    }
    
    if (element.childNodes) {
        [...element.childNodes].forEach(changeBadge);
    }
}


function userVerifyStatus(element){
    const elementPropsNames = Object.getOwnPropertyNames(element);
    const reactProps = elementPropsNames.find( nameProp => nameProp.startsWith("__reactProps"));
    const mainProps = element[reactProps];
    
    const isBlueVerified = mainProps.children.props.children[0][0].props.isBlueVerified
    const isVerified = mainProps.children.props.children[0][0].props.isVerified
    
    if(!isVerified){
        if(isBlueVerified){
            changeBadge(element) 
        }
    }
}

const observer = new MutationObserver(callbackObserver);

function callbackObserver(mutationList, observer){
    for (const mutation of mutationList) {        
        for(node of mutation.addedNodes){
            recursiveFindForElement(node)
        }
    }
}


observer.observe(document,{
    childList:true,
    subtree:true
})