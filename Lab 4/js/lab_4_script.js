// initial setup
window.addEventListener("load", addListeners);


function addListeners() {
    document.getElementById("genInfo").addEventListener("click", expandGenInfo);
    document.getElementById("edu").addEventListener("click", expandEdu);
    document.getElementById("hobbies").addEventListener("click", expandHobbies);
}

function expandGenInfo() {
    const genInfo = document.getElementById("genInfo");
    const genInfoDiv = document.getElementById("genInfoDiv");
    // case when its collapsed
    if (genInfo.textContent == "+ General Info") {
        genInfo.textContent = "- General Info";
        // show expanded options
        const genInfoSubDiv = document.createElement("div");
        const about = document.createElement("h4");
        about.setAttribute("class", "navSub");
        about.setAttribute("id", "aboutId");
        const contact = document.createElement("h4");
        contact.setAttribute("class", "navSub");
        contact.setAttribute("id", "contactId");
        genInfoSubDiv.appendChild(about);
        genInfoSubDiv.appendChild(contact);
        genInfoDiv.appendChild(genInfoSubDiv);
        about.textContent = "About me";
        contact.textContent = "Contact Info";
        about.addEventListener("click", showAboutMe);
        contact.addEventListener("click", showContactInfo);
    } else {
        // case when its expanded
        genInfo.textContent = "+ General Info";
        document.getElementById("aboutId").remove();
        document.getElementById("contactId").remove();
    }
}

function expandEdu() {
    const education = document.getElementById("edu");
    const eduDiv = document.getElementById("eduDiv");
    // case when its collapsed
    if (education.textContent == "+ Education") {
        education.textContent = "- Education";
        // show expanded options
        const eduSubDiv = document.createElement("div");
        const bachelor = document.createElement("h4");
        bachelor.setAttribute("class", "navSub");
        bachelor.setAttribute("id", "bachelorId");
        const master = document.createElement("h4");
        master.setAttribute("class", "navSub");
        master.setAttribute("id", "masterId");
        eduSubDiv.appendChild(bachelor);
        eduSubDiv.appendChild(master);
        eduDiv.appendChild(eduSubDiv);
        bachelor.textContent = "Bachelor Degree";
        master.textContent = "Master Degree";
        bachelor.addEventListener("click", showBachelor);
        master.addEventListener("click", showMaster);
    } else {
        // case when its expanded
        education.textContent = "+ Education";
        document.getElementById("bachelorId").remove();
        document.getElementById("masterId").remove();
    }
}

function expandHobbies() {
    const hobbies = document.getElementById("hobbies");
    const hobbiesDiv = document.getElementById("hobbiesDiv");
    // case when its collapsed
    if (hobbies.textContent == "+ Hobbies") {
        hobbies.textContent = "- Hobbies";
        // show expanded options
        const hobSubDiv = document.createElement("div");
        const cooking = document.createElement("h4");
        cooking.setAttribute("class", "navSub");
        cooking.setAttribute("id", "cookingId");
        const running = document.createElement("h4");
        running.setAttribute("class", "navSub");
        running.setAttribute("id", "runningId");
        hobSubDiv.appendChild(cooking);
        hobSubDiv.appendChild(running);
        hobbiesDiv.appendChild(hobSubDiv);
        cooking.textContent = "Cooking";
        running.textContent = "Running";
        cooking.addEventListener("click", showCooking);
        running.addEventListener("click", showRunning);
    } else {
        // case when its expanded
        hobbies.textContent = "+ Hobbies";
        document.getElementById("cookingId").remove();
        document.getElementById("runningId").remove();
    }
}

function showAboutMe() {
    document.getElementById("articleTitle").innerText = "About Me";
    if (document.getElementById("articleContent")) {
        document.getElementById("articleContent").remove();
    }
    if (document.getElementById("articleImg")) {
        document.getElementById("articleImg").src = "/Lab 4/imgs/aboutMe.jpeg";
    } else {
        const img = document.createElement("img");
        img.setAttribute("id", "articleImg");
        img.src = "/Lab 4/imgs/aboutMe.jpeg";
        document.getElementById("articleId").appendChild(img);
    }
}

function showContactInfo() {
    document.getElementById("articleTitle").innerText = "Contact Info";
    if (document.getElementById("articleImg")) {
        document.getElementById("articleImg").remove();
    }
    if (!document.getElementById("articleContent")) {
        const content = document.createElement("div");
        content.setAttribute("id", "articleContent");
        const name = document.createElement("p");
        const email = document.createElement("p");
        const phone = document.createElement("p");
        name.textContent = "name: John Smith";
        email.textContent = "email: John.Smith@gmail.com";
        phone.textContent = "phone: 1-123-456-7890";
        content.appendChild(name);
        content.appendChild(email);
        content.appendChild(phone);
        document.getElementById("articleId").appendChild(content);
    } else {
        document.getElementById("articleContent").remove(); 
        const content = document.createElement("div");
        content.setAttribute("id", "articleContent");
        const name = document.createElement("p");
        const email = document.createElement("p");
        const phone = document.createElement("p");
        name.textContent = "name: John Smith";
        email.textContent = "email: John.Smith@gmail.com";
        phone.textContent = "phone: 1-123-456-7890";
        content.appendChild(name);
        content.appendChild(email);
        content.appendChild(phone);
        document.getElementById("articleId").appendChild(content);
    }
}

function showBachelor() {
    document.getElementById("articleTitle").innerText = "Bachelor";
    if (document.getElementById("articleImg")) {
        document.getElementById("articleImg").remove();
    }
    if (!document.getElementById("articleContent")) {
        const content = document.createElement("p");
        content.setAttribute("id", "articleContent");
        document.getElementById("articleId").appendChild(content);
        content.textContent = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
    } else {
        document.getElementById("articleContent").textContent = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
    }
}

function showMaster() {
    document.getElementById("articleTitle").innerText = "Master";
    if (document.getElementById("articleImg")) {
        document.getElementById("articleImg").remove();
    }
    if (!document.getElementById("articleContent")) {
        const content = document.createElement("p");
        content.setAttribute("id", "articleContent");
        document.getElementById("articleId").appendChild(content);
        content.textContent = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";
    } else {
        document.getElementById("articleContent").textContent = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";
    }
}

function showCooking() {
    document.getElementById("articleTitle").innerText = "Cooking";
    if (document.getElementById("articleImg")) {
        document.getElementById("articleImg").src = "/Lab 4/imgs/cookingImg.jpg";
    } else {
        const img = document.createElement("img");
        img.setAttribute("id", "articleImg");
        img.src = "/Lab 4/imgs/cookingImg.jpg";
        document.getElementById("articleId").appendChild(img);
    }
    if (document.getElementById("articleContent")) {
        document.getElementById("articleContent").remove();
    }
}

function showRunning() {
    document.getElementById("articleTitle").innerText = "Running";
    if (document.getElementById("articleImg")) {
        document.getElementById("articleImg").src = "/Lab 4/imgs/runningImg.jpg";
    } else {
        const img = document.createElement("img");
        img.setAttribute("id", "articleImg");
        img.src = "/Lab 4/imgs/runningImg.jpg";
        document.getElementById("articleId").appendChild(img);
    }
    if (document.getElementById("articleContent")) {
        document.getElementById("articleContent").remove();
    }
}