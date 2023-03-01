const colorPicker = document.getElementById("color-picker")
const badgePickColor = document.querySelectorAll(".badge-pick-color")

colorPicker.addEventListener("input",(e)=>{
    badgePickColor.forEach(element => {
        element.style.fill= e.target.value
    });
})


