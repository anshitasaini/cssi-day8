passInput = document.querySelector("#passcodeInput")
printMessage = document.querySelector('#message')
another = document.querySelector("#another")
messageContainer = document.querySelector("#messageContainer")

const getMessages = () => {
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        for (let key in data) {
            const message = data[key];
            console.log(message);
            if (myPass == message.passcode) {
                renderMessageAsHTML(message);
            }       
        }
    });

}

let attempts = 0;

const findMessage = (myPass) => {
    let found = 0;
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        for (let key in data) {
            const message = data[key];
            console.log(message);
            if (myPass == message.passcode) {
                renderMessageAsHTML(message);
                found += 1
            }     
        }
        if (found == 0) {
            alert("Passcode does not match any messages!")
        }
        if (attempts >= 5) {
            alert ("5 attempts are up!")
            document.querySelector("#passcode").disabled = true;
            document.querySelector("#viewMsg").disabled = true;
            setTimeout(refresh, 3000)
        }
    });
}

document.querySelector("#viewMsg").addEventListener("click", (e) => {
    const passcode = document.querySelector('#passcode').value;
    attempts += 1;
    findMessage(passcode);
});

document.querySelector("#another").addEventListener("click", () => {
    passInput.style.display = 'block';
    printMessage.innerHTML = '';
    another.style.display = 'none';
    messageContainer.style.display = 'none';
    attempts = 0;
});


renderMessageAsHTML = (message) => {
    passInput.style.display = 'none';
    messageContainer.style.display = 'block';
    printMessage.innerHTML = message.message;
    another.style.display = 'block';
}


refresh = () => {
    attempts = 0;
    document.querySelector("#passcode").disabled = false;
    document.querySelector("#viewMsg").disabled = false;
    alert("You can try again now.")
}