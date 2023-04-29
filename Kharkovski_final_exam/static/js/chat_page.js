window.addEventListener('load', setup);
let timeout = 1000;

function setup() {
    var sendMessageButton = document.getElementById("send");
    fetchNewData();

    sendMessageButton.addEventListener("click", function (event) {
        event.preventDefault();
        var message = document.getElementById("message").value;
        var author = document.getElementById("author").innerHTML;

        if (message == "") {
            alert("Please enter a message");
        }
        else {
            fetch("/new_message/", {
                method: "post",
                headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
                body: `username=${author}&message=${message}`
            })
                .then((response) => {
                    chat_window.value = `User: ${author}:\n${message}\n\n` + chat_window.value;
                    return response;
                })
                .catch(() => {
                    chat_window.value = "error sending message to server";
                });
        }
    });
}

function fetchNewData() {
    console.log("fetching new data");
    fetch("/messages/")
        .then((response) => {
            return response.json();
        })
        .then((results) => {
            let chat_window = document.getElementById("chat_window");
            let messages = "";
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
        .catch(() => {
            chat_window.value = "error retrieving messages from server";
        });
    window.setTimeout(fetchNewData, timeout);
}