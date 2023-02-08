let genInfoLink = document.getElementById("genInfoLink");
let educationLink = document.getElementById("educationLink");
let hobbiesLink = document.getElementById("hobbiesLink");

let aboutMeLink = document.createElement("h4");
aboutMeLink.textContent = "About me";
let contactInfoLink = document.createElement("h4");
contactInfoLink.textContent = "Contact Info";
let bachelorDegreeLink = document.createElement("h4");
bachelorDegreeLink.textContent = "Bachelor Degree";
let masterDegreeLink = document.createElement("h4");
masterDegreeLink.textContent = "Master Degree";
let cookingLink = document.createElement("h4");
cookingLink.textContent = "Cooking";
let runningLink = document.createElement("h4");
runningLink.textContent = "Running";

genInfoLink.appendChild(aboutMeLink);
genInfoLink.appendChild(contactInfoLink);
educationLink.appendChild(bachelorDegreeLink);
