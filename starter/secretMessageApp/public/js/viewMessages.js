const getMessages = () => {
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        for (let key in data) {
            const message = data[key];
            console.log(message);
            if (myPass == message.passcode) {
                renderMessage(message);
            }       
        }
    });

}

const findMessage = (myPass) => {
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        for (let key in data) {
            const message = data[key];
            console.log(message);
            if (myPass == message.passcode) {
                renderMessage(message);
            }       
        }
    });
}

document.querySelector("#viewMsg").addEventListener("click", () => {
    const passcode = document.querySelector('#passcode').value;
    findMessage(passcode);
});
