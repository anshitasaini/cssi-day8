let submit = document.querySelector("#submit")
let message = document.querySelector("#message")
let passcode = document.querySelector("#passcode")

message.onkeypress = function () {
    if (message.value.length > 20) {
        message.value = message.value.substring(0, message.value.length - 2)
        alert("Message must be shorter than 20 characters");
    }
};

function hash(pass) {
    return new Hashes.MD5().hex(pass)
}

function containsNum(pass) {
  return /\d/.test(pass);
}

function containsCap(pass) {
  if (pass.toLowerCase() == pass) {
    return false;
  }
  else {
    return true;
  }
}

submit.addEventListener("click", (e) => {
    if (containsNum(passcode.value) == false) {
        alert("Passcode must contain at least 1 number!");
    }
    else if (containsCap(passcode.value) == false) {
        alert("Passcode must contain at least 1 capital letter!");
    }
    else {
        writeUserData(message.value, hash(passcode.value));
    }
})

function writeUserData(mess, pass) {
  firebase.database().ref().push({
    message: mess,
    passcode: pass
  });
}

