// Show/hide functionality
// console.log(document.querySelectorAll(".education-item"))

function removeitem(selector:string){
let e:any = document.querySelectorAll(`.${selector}`)

e.forEach((item:any) => {
    item.addEventListener("mouseover", (event:any) => {
        item.querySelector(".hidebtn").style.display = "block";
        item.querySelector(".hide").addEventListener("click",(() =>{
            item.style.display= "none"
        }))
    });

    // Hide the buttons on mouseout
    item.addEventListener("mouseout", (event:any) => {
        item.querySelector(".hidebtn").style.display = "none";
    });
})
}

removeitem("education-item")
removeitem("experience-item")