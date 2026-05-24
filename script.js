const inputBox = document.getElementById("inputBox");

inputBox.addEventListener("input", change);

function change(event){
    console.log(event.data)
    let obj = {
        msg: event.target.value
    };
    socket.send(JSON.stringify(obj));
}

const socket = new WebSocket('ws://localhost:8080/');

socket.onopen = () => {
    let obj = {
        msg: 'Hello Server!'
    };
    socket.send(JSON.stringify(obj));
};
socket.onmessage = (event) => {
    console.log('Server says:', event.data);
    inputBox.value = JSON.parse(event.data).msg
};
