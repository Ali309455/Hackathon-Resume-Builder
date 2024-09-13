"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getformdata(selector) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var _a;
            (_a = document
                .getElementById(`${selector}`)) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent the form from submitting normally
                // Create a new FormData object
                const formData = new FormData(event.target);
                // Convert FormData to a regular object
                const formObj = {};
                formData.forEach((value, key) => {
                    // Handle multiple input names (like education, experience)
                    if (formObj[key]) {
                        if (!Array.isArray(formObj[key])) {
                            formObj[key] = [formObj[key]]; // Convert to an array if it's not already
                        }
                        formObj[key].push(value); // Add new value to the existing array
                    }
                    else {
                        formObj[key] = value;
                    }
                });
                resolve(formObj); // Resolve the Promise with the collected data
            });
        });
    });
}
function addadditionalform(selector) {
    if (selector == "form_education_item") {
        let elder = document.getElementsByClassName(`${selector}`);
        if (elder.length > 0) {
            let newsibling = document.createElement("div");
            newsibling.classList.add("education-item");
            newsibling.innerHTML = `
            <img class = "close" src="assets/close.svg" width="20px" alt="">
            <label class = "topsep" for="degree">Degree:</label>
            <input type="text" name="degree" placeholder="e.g., Master of Science" required>
            
            <label for="university">University/College:</label>
            <input type="text" name="university" placeholder="e.g., XYZ University" required>
            
            <label for="year">Year:</label>
            <input type="text" name="year" placeholder="e.g., 2020 - 2022" required>`; // Fill in the HTML content
            elder[elder.length - 1].insertAdjacentElement("afterend", newsibling);
        }
        else {
            console.error("No '.education-item' elements found");
        }
    }
    else if (selector == "form_experience_item") {
        let elder = document.getElementsByClassName(`${selector}`);
        if (elder.length > 0) {
            let newsibling = document.createElement("div");
            newsibling.classList.add("experience-item");
            newsibling.innerHTML = `
            <img class = "close" src="assets/close.svg" width="20px" alt="">
            <label class = "topsep" for="jobTitle">Job Title:</label>
            <input type="text" name="jobTitle" placeholder="e.g., Software Developer" required>
            
            <label for="company">Company:</label>
            <input type="text" name="company" placeholder="e.g., Devsinc." required>
            
            <label for="jobYear">Year:</label>
            <input type="text" name="jobYear" placeholder="e.g., 2022 - Present" required>
            
            <textarea name="jobDescription" rows="3" placeholder="Describe your responsibilities"></textarea>`;
            elder[elder.length - 1].insertAdjacentElement("afterend", newsibling);
        }
        else {
            console.error("No '.education-item' elements found");
        }
    }
}
function closeadditionalform(parent) {
    const items = document.querySelectorAll(`.${parent}`);
    console.log(items);
    items.forEach((item) => {
        // Check if the item contains a child element with the class "close"
        const closeButton = item.querySelector(".close");
        let element = item;
        if (closeButton !== null) {
            // Add a click event listener to the close button
            closeButton.addEventListener("click", () => {
                element.style.display = "none";
            });
        }
    });
}
function removeitem(selector) {
    let e = document.querySelectorAll(`.${selector}`);
    if (!e) {
        console.error("No elements found with the class name: ${selector}");
        return;
    }
    else {
        e.forEach((item) => {
            item.addEventListener("mouseover", (event) => {
                item.querySelector(".hidebtn").style.display = "block";
                item.querySelector(".hide").addEventListener("click", () => {
                    item.style.display = "none";
                });
            });
            // Hide the buttons on mouseout
            item.addEventListener("mouseout", (event) => {
                item.querySelector(".hidebtn").style.display = "none";
            });
        });
    }
}
function createresume(data) {
    const container = document.querySelector(".resume");
    if (!container) {
        console.error("No resume container found");
        return;
    }
    setTimeout(() => {
        container.innerHTML = `<div class="edit"><img src="assets/edit.svg" alt="">Edit</div><!-- Personal Information -->
    <header class="personal-info">
        <img src="assets/profile.png" alt="Profile Picture" class="profile-pic">
        <div class="personalinfo_desc">
        <h1>${data.name}</h1>
            <p class="Email flex">
                <img src="assets/email.svg" alt="email-icon">
                ${data.email}  &nbsp| <img src="assets/phone.svg" alt="phone-icon"> ${data.phone}
            </p>
        </div>
    </header>`;
        if (Array.isArray(data.degree) &&
            Array.isArray(data.university)) {
            container.innerHTML =
                container.innerHTML +
                    `<!-- Education -->
    <section class="section">
        <h2>Education</h2>`;
            for (let index = 0; index < data.degree.length; index++) {
                const degree = data.degree[index];
                const university = data.university[index];
                const year = data.year[index];
                container.innerHTML =
                    container.innerHTML +
                        `
        <div class="education-item resume-education">
            <div class="hidebtn">
                <div class="hide"><img src="assets/delete.svg" alt="delete-icon"></div>
            </div>
            <div class="desc">
                <h3>${degree}</h3>
                <p>${university}, ${year}</p>
            </div>
        </div>
        </section>`;
            }
        }
        else {
            container.innerHTML =
                container.innerHTML +
                    `<!-- Education -->
    <section class="section">
        <h2>Education</h2>
        <div class="education-item resume-education">
            <div class="hidebtn">
                <div class="hide"><img src="assets/delete.svg" alt="delete-icon"></div>
            </div>
            <div class="desc">
                <h3>${data.degree}</h3>
                <p>${data.university}, ${data.year}</p>
            </div>
        </div>
        </section>`;
        }
        container.innerHTML =
            container.innerHTML +
                `<!-- Skills -->
    <section class="section">
        <h2>Skills</h2>
        <ul class="skills-list">`;
        let skills = data.skills;
        if (skills.includes("/new")) {
            skills = skills.split("/new");
            for (let item of skills) {
                if (item.includes("/b")) {
                    let e = (item.split('/b'));
                    container.innerHTML =
                        container.innerHTML +
                            `<li><b>${e[0]}</b> ${e[1]}</li>
            </ul>
        </section>`;
                }
            }
        }
        else {
            container.innerHTML =
                container.innerHTML +
                    `<li>${skills}</li>
            </ul>
        </section>`;
            if (skills.includes("/b")) {
                console.log('her3w');
                let item = skills.split("/b");
                container.innerHTML =
                    container.innerHTML +
                        `<li><b>${item[0]}</b> ${item[1]}</li>
            </ul>
        </section>`;
            }
            // }
            if (Array.isArray(data.jobTitle) &&
                Array.isArray(data.jobYear)) {
                container.innerHTML =
                    container.innerHTML +
                        `<!-- Experience -->
        <section class="section">
            <h2>Work Experience</h2>`;
                for (let index = 0; index < data.jobTitle.length; index++) {
                    const jobYear = data.jobYear[index];
                    const jobTitle = data.jobTitle[index];
                    const company = data.company[index];
                    const jobDescription = data.jobDescription[index];
                    container.innerHTML =
                        container.innerHTML +
                            `
                <div class="experience-item resume-experience">
                    <div class="hidebtn">
                        <div class="hide"><img src="assets/delete.svg" alt="delete-icon"></div>
                    </div>
                    <div class="desc">
                        <h3>${jobTitle}</h3>
                        <p >${company}, ${jobYear}</p>
                        <ul>
                            <li>${jobDescription}</li>
                        </ul>
                    </div>
                </div>
                <div class="experience-item">
                </section>`;
                }
            }
            else {
                container.innerHTML =
                    container.innerHTML +
                        `<!-- Experience -->
    <section class="section">
        <h2>Work Experience</h2>

        <div class="experience-item">
            <div class="hidebtn">
                <div class="hide"><img src="assets/delete.svg" alt="delete-icon"></div>
            </div>
            <div class="desc">
                <h3>${data.jobTitle}</h3>
                <p >${data.company}, ${data.jobYear}</p>
                <ul>
                    <li>${data.jobDescription}</li>
                </ul>
            </div>
        </div>
    </section>`;
            }
            if (document.querySelector(".resume")) {
                document.querySelector(".resume").style.display =
                    "block";
                document.querySelector(".bar").style.display = "none";
            }
            else {
                console.error("No resume container found");
            }
        }
    }, 2000);
    if (document.querySelector(".form-container")) {
        document.querySelector(".form-container").style.transform =
            "translateX(-1325px)";
    }
    else {
        console.error("No resume container found");
    }
    // document.querySelector(".bar")?.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
    document.querySelector(".bar").style.width = "99%";
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        (_a = document.getElementById("addeducation")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            addadditionalform("form_education_item");
            closeadditionalform("education-item");
        });
        (_b = document.getElementById("addExperience")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            addadditionalform("form_experience_item");
            closeadditionalform("experience-item");
        });
        (_c = document.querySelector(".submitbtn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let res = yield getformdata("resumeForm");
            console.log(res);
            let chk = {
                name: "Jon Stewart Doe",
                email: "test@example.us",
                phone: "6019521325",
                profilePicture: new File([""], "profile.png", { type: "image/png" }), // Example file with content, name, and type
                degree: "Master of Science",
                university: "XYZ University",
                year: "2020 - 2022",
                company: "Fake Company",
                jobTitle: "Software Developer",
                jobYear: "2022 - Present",
                jobDescription: "Developed and maintained web applications using JavaScript.",
                skills: "PROGMRAMMING:/b JavaScript, Python, HTML/CSS /new Tools:/b Git",
            };
            createresume(res);
            (_a = document.querySelector(".bar")) === null || _a === void 0 ? void 0 : _a.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            setTimeout(() => {
                removeitem("education-item");
                removeitem("experience-item");
                document.querySelector(".edit").style.display = "flex";
            }, 2000);
        }));
    });
}
main();
