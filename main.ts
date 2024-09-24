
interface FormDataObject {
  [key: string]: string | string[];
}
// interface Window {
//   jspdf: any; // You can replace 'any' with the actual type if you want
// }
// import jsPDF from 'jspdf'; // Import the jsPDF library

  // window.jsPDF = window.jspdf.jsPDF;
// Import the jsPDF library
// import jsPDF from 'jspdf';

// Assign the jsPDF object to the window object
// (window as any).jsPDF = jsPDF;
// get data from the forms
async function getformdata(selector: string) {
  return new Promise((resolve, reject) => {
    document
      .getElementById(`${selector}`)
      ?.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Create a new FormData object
        const formData = new FormData(event.target as HTMLFormElement);

        // Convert FormData to a regular object
        const formObj: FormDataObject = {};

        formData.forEach((value, key) => {
          // Handle multiple input names (like education, experience)
          if (formObj[key]) {
            if (!Array.isArray(formObj[key])) {
              formObj[key] = [formObj[key] as string]; // Convert to an array if it's not already
            }
            (formObj[key] as string[]).push(value as string); // Add new value to the existing array
          } else {
            formObj[key] = value as string;
          }
        });

        resolve(formObj); // Resolve the Promise with the collected data
      });
  });
}
// add fuctionality to add form
function addadditionalform(selector: string) {
  if (selector == "form_education_item") {
    let elder: any = document.getElementsByClassName(`${selector}`);
    if (elder.length > 0) {
      let newsibling = document.createElement("div");
      newsibling.classList.add("form_education_item");
      newsibling.innerHTML = `
            <img class = "close" src="assets/close.svg" width="18px" alt="">
            <label class = "topsep" for="degree">Degree:</label>
            <input type="text" name="degree" placeholder="e.g., Master of Science" required>
            
            <label for="university">University/College:</label>
            <input type="text" name="university" placeholder="e.g., XYZ University" required>
            
            <label for="year">Year:</label>
            <input type="text" name="year" placeholder="e.g., 2020 - 2022" required>`; // Fill in the HTML content
      elder[elder.length - 1].insertAdjacentElement("afterend", newsibling);
    } else {
      console.error("No '.education-item' elements found");
    }
  } else if (selector == "form_experience_item") {
    let elder: any = document.getElementsByClassName(`${selector}`);
    if (elder.length > 0) {
      let newsibling = document.createElement("div");
      newsibling.classList.add("form_experience_item");
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
    } else {
      console.error("No '.education-item' elements found");
    }
  }
}
// add functionality to close it 
function closeadditionalform(parent: string) {
  const items = document.querySelectorAll(`.${parent}`);
  console.log(items);

  items.forEach((item) => {
    // Check if the item contains a child element with the class "close"
    const closeButton = item.querySelector(".close");
    let element = item as HTMLElement;
    if (closeButton !== null) {
      // Add a click event listener to the close button
      closeButton.addEventListener("click", () => {
        element.style.display = "none";
      });
    }
  });
}
// add del icon and making it fuctional
function removeitem(selector: string) {
  let e: any = document.querySelectorAll(`.${selector}`);
  if (!e) {
    console.error("No elements found with the class name: ${selector}");
    return;
  } else {
    e.forEach((item: any) => {
      item.addEventListener("mouseover", (event: any) => {
        item.querySelector(".hidebtn").style.display = "block";
        item.querySelector(".hide").addEventListener("click", () => {
          item.style.display = "none";
        });
      });

      // Hide the buttons on mouseout
      item.addEventListener("mouseout", (event: any) => {
        item.querySelector(".hidebtn").style.display = "none";
      });
    });
  }
}
// Function to toggle the dropdown menu visibility
function toggleDropdown(): void {
  const menu = document.getElementById('dropdownMenu');
  if (menu) {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }
}
// create resume from the form data
function createresume(data: object) {
  const container = document.querySelector(".resume");
  if (!container) {
    console.error("No resume container found");
    return;
  }

  setTimeout(() => {
    container.innerHTML = `
    
    <div class="edit"><img src="assets/edit.svg" alt="">Edit</div><!-- Personal Information -->
    <header class="personal-info">
        <img src="assets/profile.png" alt="Profile Picture" class="profile-pic">
        <div class="personalinfo_desc">
        <h1 contenteditable = true >${(data as FormDataObject).name}</h1>
            <p contenteditable = true class="Email flex">
                <img src="assets/email.svg" alt="email-icon">
                ${
                  (data as FormDataObject).email
                }  &nbsp| <img src="assets/phone.svg" alt="phone-icon"> ${
      (data as FormDataObject).phone
    }
            </p>
        </div>
    </header>
    `;

    if (
      Array.isArray((data as FormDataObject).degree) &&
      Array.isArray((data as FormDataObject).university)
    ) {
      container.innerHTML =
        container.innerHTML +
        `<!-- Education -->
    <section class="section">
        <h2>Education</h2>`;
      for (
        let index = 0;
        index < (data as FormDataObject).degree.length;
        index++
      ) {
        const degree = (data as FormDataObject).degree[index];
        const university = (data as FormDataObject).university[index];
        const year = (data as FormDataObject).year[index];

        container.innerHTML =
          container.innerHTML +
          `
        <div class="education-item resume-education">
            <div class="hidebtn">
                <div class="hide"><img src="assets/delete.svg" alt="delete-icon"></div>
            </div>
            <div class="desc">
                <h3 contenteditable = true >${degree}</h3>
                <p contenteditable = true >${university}, ${year}</p>
            </div>
        </div>
        </section>`;
      }
    } else {
      container.innerHTML =
        container.innerHTML +
        `<!-- Education -->
    <section class="section">
        <h2 >Education</h2>
        <div class="education-item resume-education">
            <div class="hidebtn">
                <div class="hide"><img src="assets/delete.svg" alt="delete-icon"></div>
            </div>
            <div class="desc">
                <h3 contenteditable = true >${(data as FormDataObject).degree}</h3>
                <p contenteditable = true >${(data as FormDataObject).university}, ${
          (data as FormDataObject).year
        }</p>
            </div>
        </div>
        </section>`;
    }

    let skills = (data as FormDataObject).skills
    let skillslist =  document.createElement("ul")
    skillslist.classList.add("skills-list")

    container.innerHTML =
          container.innerHTML +
          `<!-- Skills -->
        <section class="section skills">
            <h2>Skills</h2>`
    if (skills.includes("/new")){

        skills = (skills as string).split("/new")
        for (let item of skills) {
          
          if (item.includes("/b")){
            let e = (item.split('/b'));
            console.log(e);
            skillslist.innerHTML =
            skillslist.innerHTML +
            `<li><b>${e[0]}</b> ${e[1]}</li>`
            
        }
      }
      // container.innerHTML =
      //       container.innerHTML +`</ul>
      //   </section>`;
      console.log(skillslist.innerHTML);
    }
    else {
      if(skills.includes("/b")){
        
        let item = (skills as string).split("/b")
        skillslist.innerHTML =
      skillslist.innerHTML +
        `<li><b>${item[0]}</b> ${item[1]}</li>
        </ul>
        </section>`;}
        skillslist.innerHTML =
        skillslist.innerHTML +
        `<li>${skills}</li>
            `;
    }
    (document.querySelector(".skills"))?.appendChild(skillslist)
    
    
    
    if (
      Array.isArray((data as FormDataObject).jobTitle) &&
      Array.isArray((data as FormDataObject).jobYear)
    ) {
      container.innerHTML =
        container.innerHTML +
        `<!-- Experience -->
        <section class="section">
            <h2>Work Experience</h2>`;
      for (
        let index = 0;
        index < (data as FormDataObject).jobTitle.length;
        index++
      ) {
        const jobYear = (data as FormDataObject).jobYear[index];
        const jobTitle = (data as FormDataObject).jobTitle[index];
        const company = (data as FormDataObject).company[index];
        const jobDescription = (data as FormDataObject).jobDescription[index];

        container.innerHTML =
          container.innerHTML +
          `
                <div class="experience-item resume-experience">
                    <div class="hidebtn">
                        <div class="hide"><img src="assets/delete.svg" alt="delete-icon"></div>
                    </div>
                    <div class="desc">
                        <h3 contenteditable = true >${jobTitle}</h3>
                        <p contenteditable = true >${company}, ${jobYear}</p>
                        <ul>
                            <li contenteditable = true>${jobDescription}</li>
                        </ul>
                    </div>
                </div>
                <div class="experience-item">
                </section>`;
      }
    } else {
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
                <h3 contenteditable = true >${(data as FormDataObject).jobTitle}</h3>
                <p contenteditable = true >${(data as FormDataObject).company}, ${
          (data as FormDataObject).jobYear
        }</p>
                <ul>
                    <li>${(data as FormDataObject).jobDescription}</li>
                </ul>
            </div>
        </div>
    </section>
    `;
    }
    if (document.querySelector(".resume")) {
      (document.querySelector(".resume") as HTMLElement).style.display =
        "block";
      (document.querySelector(".bar") as HTMLElement).style.display = "none";
    } else {
      console.error("No resume container found");
    }
  

  
  
}, 1000);
  if (document.querySelector(".form-container")) {
    (document.querySelector(".form-container") as HTMLElement).style.transform =
      "translateX(-1325px)";
  } else {
    console.error("No resume container found");
  }

  // document.querySelector(".bar")?.scrollTo({
  //   top: 0,
  //   behavior: "smooth",
  // });
  (document.querySelector(".bar") as HTMLElement).style.width = "99%";
}

async function main() {
  // make form add education/experince btn fuctional
  document.getElementById("addeducation")?.addEventListener("click", () => {
    addadditionalform("form_education_item");
    closeadditionalform("form_education_item");
  });
  document.getElementById("addExperience")?.addEventListener("click", () => {
    addadditionalform("form_experience_item");
    closeadditionalform("form_experience_item");
  });
// trigger series of events when submit btn is clicked
  document.querySelector(".submitbtn")?.addEventListener("click", async () => {
    // formdata object
    let res: any = await getformdata("resumeForm");
    console.log(res);
    // let chk: object = {
    //   name: "Jon Stewart Doe",
    //   email: "test@example.us",
    //   phone: "6019521325",
    //   profilePicture: new File([""], "profile.png", { type: "image/png" }), // Example file with content, name, and type
    //   degree: "Master of Science",
    //   university: "XYZ University",
    //   year: "2020 - 2022",
    //   company: "Fake Company",
    //   jobTitle: "Software Developer",
    //   jobYear: "2022 - Present",
    //   jobDescription:
    //     "Developed and maintained web applications using JavaScript.",
    //   skills: "PROGMRAMMING:/b JavaScript, Python, HTML/CSS /new Tools:/b Git",
    // };
    createresume(res);
    document.querySelector(".resume")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    (document.querySelector(".nav_btns") as HTMLElement).style.display = "flex"
    
    setTimeout(() => {
      removeitem("education-item");
      removeitem("experience-item");
      (document.querySelector(".form-container") as HTMLElement).style.display = "none"
      // Add event listener to edit in forms button
  const editinformbtn = document.querySelector(".backtoform")
  
  if(editinformbtn){
    editinformbtn.addEventListener("click", () => {
      (document.querySelector(".nav_btns") as HTMLElement).style.display = "none";

      (document.querySelector(".form-container") as HTMLElement).style.transform = "translateX(1px)";
      (document.querySelector(".resume") as HTMLElement).style.display = "none";
      (document.querySelector(".form-container") as HTMLElement).style.display = "block";
    });
  }

    // Add event listener to the dropdown button
    const dropdownButton = document.getElementById('dropdownButton');
    if (dropdownButton) {
    dropdownButton.addEventListener("click" , toggleDropdown)
      }
    
      




  
      // (document.querySelector(".edit") as HTMLElement).style.display = "flex";
      
    }, 1500);
  });
  


}










main();
