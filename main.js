"use strict";
// Show/hide functionality
// console.log(document.querySelectorAll(".education-item"))
function removeitem(selector) {
    let e = document.querySelectorAll(`.${selector}`);
    e.forEach((item) => {
        item.addEventListener("mouseover", (event) => {
            item.querySelector(".hidebtn").style.display = "block";
            item.querySelector(".hide").addEventListener("click", (() => {
                item.style.display = "none";
            }));
        });
        // Hide the buttons on mouseout
        item.addEventListener("mouseout", (event) => {
            item.querySelector(".hidebtn").style.display = "none";
        });
    });
}
removeitem("education-item");
removeitem("experience-item");
