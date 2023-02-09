// initial setup
window.addEventListener("load", addListeners);

function addListeners() {
    document.getElementById("genInfoLink").addEventListener("click", expandGenInfo);
    document.getElementById("eduLink").addEventListener("click", expandEdu);
    document.getElementById("hobbiesLink").addEventListener("click", expandHobbies);
    document.getElementById("aboutMeLink").addEventListener("click", showAboutMe);
    document.getElementById("contactLink").addEventListener("click", showContactInfo);
    document.getElementById("bachelorLink").addEventListener("click", showBachelor);
    document.getElementById("masterLink").addEventListener("click", showMaster);
    document.getElementById("cookingLink").addEventListener("click", showCooking);
    document.getElementById("runningLink").addEventListener("click", showRunning);
}

function expandGenInfo() {
    // case when its collapsed
    if (document.getElementById("genInfoLink").textContent == "+ General Info") {
        document.getElementById("genInfoLink").textContent = "- General Info";
        // show expanded options
        document.getElementById("aboutMeLink").textContent = "About Me";
        document.getElementById("contactLink").textContent = "Contact Info";
    } else {
        // case when its expanded
        document.getElementById("genInfoLink").textContent = "+ General Info";
        document.getElementById("aboutMeLink").textContent = "";
        document.getElementById("contactLink").textContent = "";
    }
    // if shown content is not genInfo, show it
    document.getElementById("articleTitle").innerText = "General Info";
    document.getElementById("articleContent").innerText = "gen info desc";
}

function expandEdu() {
    // case when its collapsed
    if (document.getElementById("eduLink").textContent == "+ Education") {
        document.getElementById("eduLink").textContent = "- Education";
        // show expanded options
        document.getElementById("bachelorLink").textContent = "Bachelor Degree";
        document.getElementById("masterLink").textContent = "Master Degree";
    } else {
        // case when its expanded
        document.getElementById("eduLink").textContent = "+ Education";
        document.getElementById("bachelorLink").textContent = "";
        document.getElementById("masterLink").textContent = "";
    }
    // if shown content is not education, show it
    document.getElementById("articleTitle").innerText = "Education";
    document.getElementById("articleContent").innerText = "edu desc";
}

function expandHobbies() {
    // case when its collapsed
    if (document.getElementById("hobbiesLink").textContent == "+ Hobbies") {
        document.getElementById("hobbiesLink").textContent = "- Hobbies";
        // show expanded options
        document.getElementById("cookingLink").textContent = "Cooking";
        document.getElementById("runningLink").textContent = "Running";
    } else {
        // case when its expanded
        document.getElementById("hobbiesLink").textContent = "+ Hobbies";
        document.getElementById("cookingLink").textContent = "";
        document.getElementById("runningLink").textContent = "";
    }
    // if shown content is not hobbies, show it
    document.getElementById("articleTitle").innerText = "Hobbies";
    document.getElementById("articleContent").innerText = "hobbies desc";
}

function showAboutMe() {
    document.getElementById("articleTitle").innerText = "About Me";
    document.getElementById("articleContent").innerText = "about me desc";
}

function showContactInfo() {
    document.getElementById("articleTitle").innerText = "Contact Info";
    document.getElementById("articleContent").innerText = "contact info desc";
}

function showBachelor() {
    document.getElementById("articleTitle").innerText = "Bachelor";
    document.getElementById("articleContent").innerText = "bachelor desc";
}

function showMaster() {
    document.getElementById("articleTitle").innerText = "Master";
    document.getElementById("articleContent").innerText = "master desc";
}

function showCooking() {
    document.getElementById("articleTitle").innerText = "Cooking";
    document.getElementById("articleContent").innerText = "cooking desc";
}

function showRunning() {
    document.getElementById("articleTitle").innerText = "Running";
    document.getElementById("articleContent").innerText = "running";
}