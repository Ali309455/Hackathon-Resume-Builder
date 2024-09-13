"use strict";
function createresume(data) {
    const container = document.querySelector(".resume");
    const formContainer = document.querySelector(".form-container");
    const progressBar = document.querySelector(".bar");
    if (!container) {
        console.error("No resume container found");
        return;
    }
    setTimeout(() => {
        container.innerHTML = `<!-- Personal Information -->
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
        // Add Education section
        if (Array.isArray(data.degree) && Array.isArray(data.university)) {
            container.innerHTML += `<!-- Education -->
            <section class="section">
                <h2>Education</h2>`;
            for (let index = 0; index < (data.degree).length; index++) {
                const degree = (data.degree)[index];
                const university = (data.university)[index];
                const year = (data.year)[index];
                container.innerHTML += `
                <div class="education-item">
                    <div class="hidebtn">
                        <div class="hide"><img src="assets/delete.svg" alt="delete-icon"></div>
                    </div>
                    <div class="desc">
                        <h3>${degree}</h3>
                        <p>${university}, ${year}</p>
                    </div>
                </div>`;
            }
            container.innerHTML += `</section>`;
        }
        else {
            container.innerHTML += `<!-- Education -->
            <section class="section">
                <h2>Education</h2>
                <div class="education-item">
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
        // Add Skills section
        container.innerHTML += `<!-- Skills -->
        <section class="section">
            <h2>Skills</h2>
            <ul class="skills-list">
                <li><b>Programming:</b> ${data.skills}</li>
                <li><b>Web Development:</b> HTML, CSS</li>
                <li><b>Database Management:</b> MongoDB</li>
                <li><b>Tools:</b> Git</li>
            </ul>
        </section>`;
        // Add Experience section
        if (Array.isArray(data.jobTitle) && Array.isArray(data.jobYear)) {
            container.innerHTML += `<!-- Experience -->
            <section class="section">
                <h2>Work Experience</h2>`;
            for (let index = 0; index < (data.jobTitle).length; index++) {
                const jobYear = (data.jobYear)[index];
                const jobTitle = (data.jobTitle)[index];
                const company = (data.company)[index];
                const jobDescription = (data.jobDescription)[index];
                container.innerHTML += `
                <div class="experience-item">
                    <div class="hidebtn">
                        <div class="hide"><img src="assets/delete.svg" alt="delete-icon"></div>
                    </div>
                    <div class="desc">
                        <h3>${jobTitle}</h3>
                        <p>${company}, ${jobYear}</p>
                        <ul>
                            <li>${jobDescription}</li>
                        </ul>
                    </div>
                </div>`;
            }
            container.innerHTML += `</section>`;
        }
        else {
            container.innerHTML += `<!-- Experience -->
            <section class="section">
                <h2>Work Experience</h2>
                <div class="experience-item">
                    <div class="hidebtn">
                        <div class="hide"><img src="assets/delete.svg" alt="delete-icon"></div>
                    </div>
                    <div class="desc">
                        <h3>${data.jobTitle}</h3>
                        <p>${data.company}, ${data.jobYear}</p>
                        <ul>
                            <li>${data.jobDescription}</li>
                        </ul>
                    </div>
                </div>
            </section>`;
        }
        if (container) {
            container.style.display = 'block';
        }
        if (formContainer) {
            formContainer.style.transform = "translateX(-1325px)";
        }
        if (progressBar) {
            progressBar.style.width = "99%";
        }
        // Scroll to the top of the resume container
        requestAnimationFrame(() => {
            container === null || container === void 0 ? void 0 : container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }, 2000); // Delay to ensure all content is added
}
