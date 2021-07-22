let submit = document.querySelector("#submit")
let message = document.querySelector("#message")
let passcode = document.querySelector("#passcode")

message.onkeypress = function () {
    if (message.value.length > 20) {
        message.value = message.value.substring(0, message.value.length - 2)
        alert("Message must be shorter than 20 characters");
    }
};

submit.addEventListener("click", (e) => {
        if (message.value.length > 20) {
            message.value = message.value.substring(0, message.value.length - 2)
        alert("Message must be shorter than 20 characters");
    }
    writeUserData(message.value, passcode.value);
})

function writeUserData(mess, pass) {
  firebase.database().ref().push({
    message: mess,
    passcode: pass
  });
}
