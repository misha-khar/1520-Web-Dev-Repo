// add window event listener to run setup function when page loads
window.addEventListener('load', setup);
// let timeout = 1000;
let timeout = 15000;
// pretty slow timeout, could make faster

// init setup func
function setup() {
    var sendMessageButton = document.getElementById("send");
    // grab initial data if exists from previous session
    fetchNewData();
    // event listneer for send button
    sendMessageButton.addEventListener("click", function (event) {
        // prevent default behavior
        event.preventDefault();
        var message = document.getElementById("message").value;
        var author = document.getElementById("author").innerHTML;
        // if empty message, alert user
        if (message == "") {
            alert("Please enter a message");
        }
        // else send message to server
        else {
            // send a post request to server with message and author
            fetch("/new_message/", {
                method: "post",
                headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
                body: `username=${author}&message=${message}`
            })
                // if successful, prepend message to chat window, most recent on top
                .then((response) => {
                    chat_window.value = `User: ${author}:\n${message}\n\n` + chat_window.value;
                    return response;
                })
                // if error, alert user
                .catch(() => {
                    chat_window.value = "error sending message to server";
                });
        }
    });
}

// function to fetch new data from server
function fetchNewData() {
    console.log("fetching new data");
    // fetch data from server
    fetch("/messages/")
        // if successful, update chat window with new data
        .then((response) => {
            return response.json();
        })
        // if successful, update chat window with new data
        .then((results) => {
            let chat_window = document.getElementById("chat_window");
            let messages = "";
            // loop through results and add to chat window
            for (let index in results) {
                current_set = results[index];
                for (let key in current_set) {
                    author = key;
                    message = current_set[key];
                    messages += `User: ${author}:\n${message}\n\n`;
                }
            }
            chat_window.value = messages;
        })
        // if error, alert user
        .catch(() => {
            chat_window.value = "error retrieving messages from server";
        });
    // set timeout to fetch new data again
    window.setTimeout(fetchNewData, timeout);
}